'use strict';

const { Router }        = require('express');
const initHealthRoutes  = require('./health.route.js');
const initNoteRoutes    = require('./note.route.js');

const initRoutes = (controllers) => {
    const router = Router();

    router.use('/health-check', initHealthRoutes());
    router.use('/notes', initNoteRoutes(controllers.noteController));
    
    return router;
};

module.exports = initRoutes;