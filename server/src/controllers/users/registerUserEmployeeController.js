import Joi from 'joi';

import insertEmployeeService from '../../services/users/insertEmployeeService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserEmployeeController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().min(6).max(50),
            userName: Joi.string().min(4).max(25),
            job: Joi.string().min(4).max(25),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            console.log(validation.error.message);
            generateErrorUtil(validation.error.message, 401);
        }

        const { email, password, userName, job } = req.body;

        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                409
            );
        }

        await insertEmployeeService(email, password, userName, job);

        res.send({
            status: 'ok',
            message: 'Empleado registrado correctamente.',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserEmployeeController;
