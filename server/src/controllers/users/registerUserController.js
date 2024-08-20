import randomstring from 'randomstring';
import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().min(8).max(25),
            firstName: Joi.string().max(25),
            lastName: Joi.string().max(40),
            dni: Joi.string().length(9),
            phone: Joi.string().max(15),
            job: Joi.string().max(25),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

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
                'Usuario registrado correctamente. Revise su email para validar la cuenta',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;
