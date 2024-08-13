import jwt from 'jsonwebtoken';
import generateErrorUtils from '../utils/generateErrorUtil.js'

const authUser = (req, res, next) => {
    try {
        
        const { authorization } = req.headers; 

        if(!authorization) {
            generateErrorUtils( 'Se esperaba un token por encabezado', 401);
        }

        let tokenInfo; 

        try {
            tokenInfo = jwt.verify( authorization, process.env.SECRET)
        } catch (error) {
            generateErrorUtils( 'Credenciales inválidas', 401);
        };

        req.userLogged = tokenInfo;

        next()

    } catch (error) {
        next(error)
    }
}

export default authUser;