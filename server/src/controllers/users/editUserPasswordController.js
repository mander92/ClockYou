import Joi from 'joi';

import updateEditUserPasswordService from '../../services/users/updateEditUserPasswordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const editUserPasswordController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        const schema = Joi.object({
            actualPassword: Joi.string().min(8).max(25).required(),
            newPassword: Joi.string().min(8).max(25).required(),
            repeatNewPassword: Joi.string()
                .min(8)
                .max(25)
                .required()
                .valid(Joi.ref('newPassword')),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { actualPassword, newPassword } = req.body;

        await updateEditUserPasswordService(
            userId,
            actualPassword,
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

export default editUserPasswordController;
