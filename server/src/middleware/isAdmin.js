import generateErrorUtil from '../utils/generateErrorUtil.js';
import getPool from '../db/getPool.js';

const isAdmin = async (req, res, next) => {
    const pool = await getPool();

    const userId = req.userLogged.id;

    try {
        const [verify] = await pool.query(
            'SELECT role FROM users WHERE id = ?',
            [userId]
        );

        if (!verify.length || verify[0].role !== 'admin')
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                409
            );

        next();
    } catch (error) {
        next(error);
    }
};

export default isAdmin;
