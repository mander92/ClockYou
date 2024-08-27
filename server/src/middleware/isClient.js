import generateErrorUtil from '../utils/generateErrorUtil.js';

const isClient = (req, res, next) => {
    const role = req.userLogged.role;

    if (role !== 'client')
        generateErrorUtil('Acceso denegado: Se requiere rol de Cliente', 409);

    next();
};

export default isClient;
