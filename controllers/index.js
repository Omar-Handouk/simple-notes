'use strict';
const noteController = require('./note.controller.js');

module.exports = (db) => {
    return {
        noteController: noteController(db.Note)
    }
}