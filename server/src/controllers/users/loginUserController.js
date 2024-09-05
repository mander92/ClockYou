import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import { SECRET } from '../../../env.js';

import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const loginUserController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(50).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { email, password } = req.body;

        const user = await selectUserByEmailService(email);

        let validPassword;

        if (user) validPassword = await bcrypt.compare(password, user.password);

        if (!user || !validPassword)
            generateErrorUtil('Usuario o contraseña incorrecto.', 401);

        if (!user.active)
            generateErrorUtil('Usuario pendiente de activacion', 403);

        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const data = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;
