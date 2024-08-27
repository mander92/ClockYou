import generateErrorUtil from '../utils/generateErrorUtil.js';

const isAdmin = (req, res, next) => {
    const role = req.userLogged.role;

    if (role !== 'admin')
        generateErrorUtil(
            'Acceso denegado: Se requiere rol de Administrador',
            409
        );

    next();
};

export default isAdmin;
