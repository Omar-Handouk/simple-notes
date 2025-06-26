'use strict';
const { Router }        = require('express');
const { StatusCodes }   = require('http-status-codes');

module.exports = (controller) => {
    const router = Router();

    router.post('/', async (req, res) => {
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

    router.put('/:noteId', async (req, res) => {
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