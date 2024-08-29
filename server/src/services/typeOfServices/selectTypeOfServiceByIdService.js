import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceByIdService = async (typeOfServiceId) => {
    const pool = await getPool();

    const [type] = await pool.query(
        `
        SELECT id, image, type, description, city, price, image FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );

    if (!type.length || type[0].deletedAt === null)
        generateErrorUtil('No existe el servicio', 404);

    return type[0];
};

export default selectTypeOfServiceByIdService;
