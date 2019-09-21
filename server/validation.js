//Validation
const Joi = require('@hapi/joi');


const registrationValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        date: Joi.date()
    }
   return Joi.validate(data, schema)
}

const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema)
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;


