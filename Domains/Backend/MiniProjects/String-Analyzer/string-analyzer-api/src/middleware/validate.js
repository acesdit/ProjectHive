const { body, validationResult } = require('express-validator');

const validateStringCreation = [
    body('value')
        .isString()
        .withMessage('Value must be a string')
        .notEmpty()
        .withMessage('Value cannot be empty'),
];

const validateStringRetrieval = [
    body('id')
        .isUUID()
        .withMessage('ID must be a valid UUID'),
];

const validateStringDeletion = [
    body('id')
        .isUUID()
        .withMessage('ID must be a valid UUID'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateStringCreation,
    validateStringRetrieval,
    validateStringDeletion,
    validateRequest,
};