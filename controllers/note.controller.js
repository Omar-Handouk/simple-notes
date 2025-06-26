'use strict';

/**
 * @param {import('sequelize').ModelStatic<import('sequelize').Model<any,any>>} Note
 * @returns 
 */
module.exports = (Note) => {
    
    const createNote = async (payload) => {
        const note = await Note.create({
            columnId: 0,
            ...payload
        });

        return note;
    };

    const getNoteById = async (noteId) => {
        const note = await Note.findByPk(noteId);

        return note;
    };

    const getNotes = async () => {
        const notes = await Note.findAll();

        return notes;
    };

    const updateNote = async (noteId, payload) => {
        const note = await Note.update(payload, { where: { noteId }});

        return await Note.findByPk(noteId);
    };

    const deleteNote = async (noteId) => {
        return await Note.destroy({ where: { noteId }})
    };

    return {
        createNote,
        getNoteById,
        getNotes,
        updateNote,
        deleteNote
    }
}