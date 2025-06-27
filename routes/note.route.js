'use strict';
const { Router }            = require('express');
const { StatusCodes }       = require('http-status-codes');
const { validationResult }  = require('express-validator');

const { creationSchema, updateSchema } = require('../validations/note.validation.js');

module.exports = (controller) => {
    const router = Router();

    router.post('/', creationSchema,
        /**
         * @param {import('express').Request} req 
         * @param {import('express').Response} res 
         * @returns 
         */
        async (req, res) => {
            const valResults = validationResult(req);
            if (!valResults.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    statusCode: StatusCodes.BAD_REQUEST,
                    msg: 'Bad Request',
                    ...valResults
                });
            }

            const { title, body, columnId } = req.body;

            const note = await controller.createNote({
                title,
                body,
                columnId
            });

            return res.status(StatusCodes.CREATED).json(note);
    });

    router.get('/:noteId', async (req, res) => {
        const note = await controller.getNoteById(req.params.noteId);

        if (!note) {
            return res.status(StatusCodes.NOT_FOUND).json({
                statusCode: StatusCodes.NOT_FOUND,
                msg: 'Note not found'
            });
        }

        return res.status(StatusCodes.OK).json(note);
    });

    router.get('/', async (_req, res) => {
        const notes = await controller.getNotes();

        return res.status(StatusCodes.OK).json(notes);
    });

    router.put('/:noteId', updateSchema,
        /**
         * @param {import('express').Request} req 
         * @param {import('express').Response} res 
         * @returns 
         */
        async (req, res) => {
            const valResults = validationResult(req);
            if (!valResults.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    statusCode: StatusCodes.BAD_REQUEST,
                    msg: 'Bad Request',
                    ...valResults
                });
            }

            const { title, body, columnId } = req.body;

            const note = await controller.updateNote(req.params.noteId, {
                title,
                body,
                columnId
            });

            return res.status(StatusCodes.OK).json(note);
    });

    router.delete('/:noteId', async (req, res) => {
        await controller.deleteNote(req.params.noteId);

        return res.status(StatusCodes.OK).end();
    });

    return router;
};