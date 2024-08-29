import Joi from 'joi';

import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const userExists = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            userId: Joi.string().length(36).required(),
        });

        const validation = schema.validate(req.params);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const pool = await getPool();

        const userId = req.params.userId || req.userLogged.id;

        const [user] = await pool.query(
            `
            SELECT id, deletedAt FROM users WHERE id = ? AND deletedAt IS NULL
            `,
            [userId]
        );

        if (!user.length) generateErrorUtil('Usuario no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default userExists;
