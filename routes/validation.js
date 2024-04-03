//validation 
const Joi = require("joi");

const regiterValidation = (data) =>{
    const Schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return Schema.validate(data);
}

const loginValidation = (data) =>{
    const Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return Schema.validate(data);
}

module.exports.regiterValidation = regiterValidation;
module.exports.loginValidation = loginValidation;
