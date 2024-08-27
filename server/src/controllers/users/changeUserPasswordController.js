import Joi from 'joi';

import updateUserPasswordService from '../../services/users/updateUserPasswordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const changeUserPasswordController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            recoverPasswordCode: Joi.string().length(10).required(),
            newPassword: Joi.string().min(6).max(50).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }
        const { email, recoverPasswordCode, newPassword } = req.body;

        await updateUserPasswordService(
            email,
            recoverPasswordCode,
            newPassword
        );

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default changeUserPasswordController;
