'use strict';

const { Router }        = require('express');
const initHealthRoutes  = require('./health.js');

const initRoutes = async () => {
    const router = Router();

    router.use('/health-check', initHealthRoutes());

    return router;
};

module.exports = initRoutes;