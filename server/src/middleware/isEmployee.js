import generateErrorUtil from '../utils/generateErrorUtil.js';

const isEmployee = (req, res, next) => {
    const role = req.userLogged.role;

    if (role !== 'employee') {
        return generateErrorUtil(
            'Acceso denegado: Se requiere rol de Empleado',
            409
        );
    }

    next();
};

export default isEmployee;
