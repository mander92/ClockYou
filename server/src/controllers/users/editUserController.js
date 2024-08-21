import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserService from '../../services/users/updateUserService.js';

const editUserController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId) {
            generateErrorUtil('Acceso denegado, el token no coincide', 409);
        }

        const schema = Joi.object().keys({
            firstName: Joi.string().max(25),
            lastName: Joi.string().max(40),
            dni: Joi.string().min(9),
            phone: Joi.string().max(15),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const { firstName, lastName, dni, phone } = req.body;

        await updateUserService(userId, firstName, lastName, dni, phone);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
