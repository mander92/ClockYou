import Joi from 'joi';

import insertAdminService from '../../services/users/insertUserAdminService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserEmployeeController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            role: Joi.string().min(5).max(8),
            email: Joi.string().email(),
            password: Joi.string().min(8).max(25),
            firstName: Joi.string().max(25),
            lastName: Joi.string().max(40),
            dni: Joi.string().length(9),
            phone: Joi.string().max(15),
            job: Joi.string().max(25),
            city: Joi.string().max(25),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const {
            role,
            email,
            password,
            firstName,
            lastName,
            dni,
            phone,
            job,
            city,
        } = req.body;

        const data = await insertAdminService(
            role,
            email,
            password,
            firstName,
            lastName,
            dni,
            phone,
            job,
            city
        );

        console.log(data);

        res.send({
            status: 'ok',
            message: 'Usuario registrado correctamente.',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserEmployeeController;
