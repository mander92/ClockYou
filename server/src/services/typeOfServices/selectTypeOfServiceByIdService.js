import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceByIdService = async (typeOfServiceId) => {
    const pool = await getPool();

    const [type] = await pool.query(
        `
        SELECT type, description, city, price FROM typeOfServices WHERE id = ? AND deletedAt IS NULL
        `,
        [typeOfServiceId]
    );

    if (!type.length) generateErrorUtil('No existe el servicio', 404);

    return type[0];
};

export default selectTypeOfServiceByIdService;
