import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceByIdService = async (typeOfServiceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
            SELECT id, type, description, city, price FROM typeOfServices WHERE id = ? AND active = 'active'
            `,
        [typeOfServiceId]
    );

    if (!service.length) {
        generateErrorUtil('No existen servicios asociados a ese ID', 404);
    }

    return service;
};

export default selectTypeOfServiceByIdService;
