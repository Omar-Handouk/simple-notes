'use strict';

const { checkSchema } = require('express-validator');

const creationSchema = checkSchema({
    title: {
        in: ['body'],
        escape: true,
        trim: true,
        isString: {
            errorMessage: 'Note\'s title must be alpha numeric'
        },
        isLength: {
            errorMessage: 'Note title must be between 5 and 64 characters',
            options: {
                min: 5,
                max: 64
            }
        }
    },
    body: {
        in: ['body'],
        optional: true,
        escape: true,
        trim: true,
        isString: {
            errorMessage: 'Note\'s body must be alpha numeric'
        },
        notEmpty: {
            errorMessage: 'Note\'s body can not be empty'
        }
    },
    columnId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'ColumnId must be an integer between 0-2',
            options: {
                lt: 3
            }
        }
    }
});

const updateSchema = checkSchema({
    title: {
        in: ['body'],
        optional: true,
        escape: true,
        trim: true,
        isString: {
            errorMessage: 'Note\'s title must be alpha numeric'
        },
        isLength: {
            errorMessage: 'Note title must be between 5 and 64 characters',
            options: {
                min: 5,
                max: 64
            }
        }
    },
    body: {
        in: ['body'],
        optional: true,
        escape: true,
        trim: true,
        isString: {
            errorMessage: 'Note\'s body must be alpha numeric'
        },
        notEmpty: {
            errorMessage: 'Note\'s body can not be empty'
        }
    },
    columnId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'ColumnId must be an integer between 0-2',
            options: {
                lt: 3
            }
        }
    }
});

module.exports = {
    creationSchema,
    updateSchema
};