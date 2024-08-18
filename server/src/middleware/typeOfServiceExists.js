import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const userExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        const { typeOfServiceId } = req.params;

        const [service] = await pool.query(
            `
            SELECT id FROM typeOfServices WHERE id=?
            `,
            [typeOfServiceId]
        );

        if (!service.length)
            throw generateErrorUtil('Tipo de servicio no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default userExists;
