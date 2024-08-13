import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const loginUserController = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) throw generateErrorsUtils('El email y el password no pueden estar vacíos', 400);

        const user = await selectUserByEmailService(email);

        let validPassword;

        if(user){
            validPassword = await bcrypt.compare(password, user.password);
        }
        
        if(!user || !validPassword){
            throw generateErrorsUtils('Usuario o contraseña incorrecto.', 401);
        }

        if(!user.active) throw generateErrorsUtils('Usuario pendiente de activacion',403);

        //generamos el token
        const tokenInfo = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET,{
            expiresIn: '3d'
        });

        res.send({
            status: 'ok',
            data:{
                token
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export default loginUserController;