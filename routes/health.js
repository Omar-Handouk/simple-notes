'use strict';

const config            = require('config');
const { Router }        = require('express');
const { StatusCodes }   = require('http-status-codes');
const { version }       = require('../package.json');

const initHealthRoutes = () => {
    const router = Router();

    router.get('/', (_req, res) => {
        const currentHealthTime = new Date();

        return res.status(StatusCodes.OK).json({
            alive: true,
            version: config.get('apiVersion'),
            releaseId: version,
            currentTS: currentHealthTime.toUTCString()
        });
    });

    return router;
}

module.exports = initHealthRoutes;