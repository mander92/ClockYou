import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateErrorUtil('Se esperaba un token por encabezado', 401);
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            generateErrorUtil('Credenciales inválidas', 401);
        }

        req.userLogged = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
};

export default authUser;
