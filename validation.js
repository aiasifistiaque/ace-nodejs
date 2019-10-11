const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const schema = Joi.object({
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        //phone: Joi.string().min(11).required(),
        email: Joi.string().min(6).required().email(),
        city: Joi.string(),
        age: Joi.number(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
}

const loginValidation  = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;