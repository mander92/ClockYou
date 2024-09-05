import randomstring from 'randomstring';
import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(25).required(),
            firstName: Joi.string().max(25).required(),
            lastName: Joi.string().max(40).required(),
            dni: Joi.string().length(9).required(),
            phone: Joi.string().max(15).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { email, password, firstName, lastName, dni, phone, job } =
            req.body;

        const registrationCode = randomstring.generate(30);

        await insertUserService(
            email,
            password,
            firstName,
            lastName,
            dni,
            phone,
            registrationCode,
            job
        );

        res.send({
            status: 'ok',
            message:
                'Usuario registrado correctamente. Revise su email para validar su cuenta',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;
