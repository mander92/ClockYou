import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const serviceExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        const { serviceId } = req.params;

        const [service] = await pool.query(
            `
            SELECT id FROM services WHERE id=?
            `,
            [serviceId]
        );
        if (!service.length)
            throw generateErrorUtil('Servicio no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default serviceExists;
