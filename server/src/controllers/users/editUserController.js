import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserService from '../../services/users/updateUserService.js';

const editUserController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            userId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const schemaBody = Joi.object().keys({
            firstName: Joi.string().max(25),
            lastName: Joi.string().max(40),
            dni: Joi.string().min(9),
            phone: Joi.string().max(15),
            address: Joi.string().max(100),
            postCode: Joi.number(),
            city: Joi.string().max(40),
        });

        const validationBody = schemaBody.validate(req.body);

        if (validationBody.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const { userId } = req.params;
        const { firstName, lastName, dni, phone, address, postCode, city } =
            req.body;

        await updateUserService(
            userId,
            firstName,
            lastName,
            dni,
            phone,
            address,
            postCode,
            city
        );

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
