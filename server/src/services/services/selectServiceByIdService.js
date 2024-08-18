import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
            SELECT * FROM services WHERE id = ?
            `,
        [serviceId]
    );

    if (!service.length) {
        generateErrorUtil('No existen servicios asociados a ese ID', 404);
    }

    return service;
};

export default selectServiceByIdService;