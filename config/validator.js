const joi = require('joi');

const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().max(32).min(2).trim().pattern(new RegExp('^([a-z]+)( [a-z]+)*$', 'i')).required().messages({
            'string.min': 'Please, enter a name that is at least 2 characters long',
            'string.max': 'Your name should contain a maximum of 32 characters'
        }),
        lastName: joi.string().max(32).min(2).trim().pattern(new RegExp('^([a-z]+)( [a-z]+)*$', 'i')).required().messages({
            'string.min': 'Please, enter a name that is at least 2 characters long',
            'string.max': 'Your lastname should contain a maximum of 32 characters'
        }),
        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email': 'Invalid email address format'
        }),
        password: joi.string().max(32).min(8).trim().pattern(new RegExp('[a-zA-Z0-9]')).required().messages({
            'string.min': 'Your password should be at least 8 characters long and it should contain  lowercase, uppercase and numbers',
            'string.pattern': 'Your password should be alphanumeric with at least 1 number'
        }),
        profileurl: joi.string().required(),
        from: joi.string().required()
    });
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.json({
            success: false,
            message: validation.error.details
        });
    }
    next();
}

module.exports = validator;