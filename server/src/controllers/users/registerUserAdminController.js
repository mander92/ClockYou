import Joi from 'joi';

import insertAdminService from '../../services/users/insertUserAdminService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserAdminController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            role: Joi.string().min(5).max(8).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(25).required(),
            firstName: Joi.string().max(25).required(),
            lastName: Joi.string().max(40).required(),
            dni: Joi.string().length(9).required(),
            phone: Joi.string().max(15).required(),
            job: Joi.string().max(25).required(),
            city: Joi.string().max(25).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

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

        res.send({
            status: 'ok',
            message: 'Usuario registrado correctamente.',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserAdminController;
