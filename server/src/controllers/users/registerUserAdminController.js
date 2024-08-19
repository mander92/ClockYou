import Joi from 'joi';

import insertAdminService from '../../services/users/insertAdminService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserAdminController = async (req, res, next) => {
    try {
        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                409
            );
        }

        const schema = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().min(6).max(50),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            console.log(validation.error.message);
            generateErrorUtil(validation.error.message, 401);
        }

        const { email, password } = req.body;

        await insertAdminService(email, password);

        res.send({
            status: 'ok',
            message: 'Administrador registrado correctamente.',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserAdminController;
