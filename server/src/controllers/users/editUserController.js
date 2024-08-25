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
            phone: Joi.string().max(15),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const { firstName, lastName, phone } = req.body;

        const data = await updateUserService(
            userId,
            firstName,
            lastName,
            phone
        );

        res.send({
            status: 'ok',
            message: 'Datos actualizados correctamente',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
