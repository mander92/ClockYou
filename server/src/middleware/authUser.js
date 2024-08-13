import jwt from 'jsonwebtoken';
import generateErrorUtils from '../utils/generateErrorUtil.js'

const authUser = (req, res, next) => {
    try {
        
        const { authorization } = req.headers; 

        if(!authorization) {
            throw generateErrorUtils( 'Se esperaba un token por encabezado', 401);
        }

        let tokeInfo; 

        try {
            tokeInfo = jwt.verify( authorization, process.env.SECRET)
        } catch (error) {
            throw generateErrorUtils( 'Credenciales inválidas', 401);
        };

        req.userLogged = tokenInfo;

        next()

    } catch (error) {
        next(error)
    }
}

export default authUser;