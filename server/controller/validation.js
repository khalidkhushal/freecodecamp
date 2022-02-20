const joi = require('@hapi/joi');

const validatingsign_in = joi.object({
    id: joi.optional(),
    name: joi.string().min(6).max(20).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
    gender: joi.string().required()
});

module.exports = { validatingsign_in };