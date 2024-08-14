import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET } from '../../../env.js';

import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            generateErrorUtil(
                'El email y el password no pueden estar vacíos',
                400
            );

        const user = await selectUserByEmailService(email);

        let validPassword;

        if (user) {
            validPassword = await bcrypt.compare(password, user.password);
        }

        if (!user || !validPassword) {
            generateErrorUtil('Usuario o contraseña incorrecto.', 401);
        }

        if (!user.active)
            generateErrorUtil('Usuario pendiente de activacion', 403);
        console.log(user)
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: token
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;
