import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceByIdService = async (typeOfServiceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
            SELECT id, type, description, city, price FROM typeOfServices WHERE id = ? AND deletedAt IS NULL
            `,
        [typeOfServiceId]
    );

    if (!service.length) {
        generateErrorUtil('No existe el servicio', 404);
    }

    return service;
};

export default selectTypeOfServiceByIdService;
