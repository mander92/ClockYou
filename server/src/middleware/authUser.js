import jwt from 'jsonwebtoken';
import generateErrorsUtils from '../utils/generateErrorUtil.js'

const authUser = (req, res, next) => {
    try {
        
        const { authorization } = req.headers; 

        if(!authorization) {
            throw generateErrorsUtils( 'Se esperaba un token por encabezado', 401);
        }

        let tokeInfo; 

        try {
            tokeInfo = jwt.verify( authorization, process.env.SECRET)
        } catch (error) {
            throw generateErrorsUtils( 'Credenciales inválidas', 401);
        };

        req.userLogged = tokenInfo;

        next()

    } catch (error) {
        next(error)
    }
}

export default authUser;