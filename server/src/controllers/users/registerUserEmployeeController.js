import Joi from 'joi';

import insertEmployeeService from '../../services/users/insertEmployeeService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserEmployeeController = async (req, res, next) => {
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

        const { email, password, firstName, lastName, dni, phone, job, city } =
            req.body;

        await insertEmployeeService(
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
            message: 'Empleado registrado correctamente.',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserEmployeeController;
