import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const userExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        const userId = req.params.userId || req.userLogged.id;

        const [user] = await pool.query(
            `
            SELECT id FROM users WHERE id=?
            `,
            [userId]
        );

        if (!user.length) throw generateErrorUtil('Usuario no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default userExists;
