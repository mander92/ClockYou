import Joi from 'joi';

import updateUserPasswordService from '../../services/users/updateUserPasswordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const changeUserPasswordController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            recoverPasswordCode: Joi.string().length(10).required(),
            newPassword: Joi.string().min(8).max(25).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { recoverPasswordCode, newPassword } = req.body;

        await updateUserPasswordService(recoverPasswordCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default changeUserPasswordController;
