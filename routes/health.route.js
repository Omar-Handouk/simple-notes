'use strict';

const config            = require('config');
const { Router }        = require('express');
const { StatusCodes }   = require('http-status-codes');
const { version }       = require('../package.json');

module.exports = () => {
    const router = Router();

    router.get('/', (_req, res) => {
        const currentHealthTime = new Date();

        return res.status(StatusCodes.OK).json({
            alive: true,
            apiversion: config.get('apiVersion'),
            release: version,
            currentTS: currentHealthTime.toUTCString()
        });
    });

    return router;
}