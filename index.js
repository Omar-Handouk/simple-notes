'use strict';
require('dotenv').config();

const http              = require('http');
const config            = require('config');
const express           = require('express');
const helmet            = require('helmet');
const morgan            = require('morgan');
const { Sequelize }     = require('sequelize');
const { StatusCodes }   = require('http-status-codes');
const initRoutes        = require('./routes/index.js');

const APP_ENV   = process.env.NODE_ENV ?? 'dev';
const APP_HOST  = process.env.APP_HOST ?? '0.0.0.0';
const APP_PORT  = parseInt(process.env.APP_PORT ?? '8080');

const logFormat     = APP_ENV === 'dev' ? 'dev' : 'common';
const apiVersion    = config.get('apiVersion');
const dbConfig      = config.get('db');

const app       = express();
const sequelize = new Sequelize(dbConfig);

app.use(helmet());
app.use(morgan(logFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const main = async (app, sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('> Connection to database has been established successfully');
    } catch (err) {
        console.error('> Connection to database has failed\n------------');
        console.error(`> Error stack\n${err.stack}`);
        process.exit(1);
    }

    const routes = await initRoutes();

    app.use(`/api/v${apiVersion}`, routes);

    app.get('/', (_req, res) => {
        return res.status(StatusCodes.OK).send('200 OK');
    });

    app.use((err, _req, res, _next) => {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('500 Internal Server Error');
    });

    const server = http.createServer(app);
    server.listen(APP_PORT, APP_HOST, () => console.log(`Server is running @ http://${APP_HOST}:${APP_PORT}/`));
}

main(app, sequelize);