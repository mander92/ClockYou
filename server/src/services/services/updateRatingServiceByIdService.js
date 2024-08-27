import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateRatingServiceByIdService = async (serviceId, rating) => {
    const pool = await getPool();

    const [verify] = await pool.query(
        `
        SELECT id FROM services WHERE id = ? AND rating IS NOT NULL
        `,
        [serviceId]
    );

    if (verify.length) generateErrorUtil('Ya valoraste el servicio', 401);

    await pool.query(
        `
        UPDATE services SET rating = ? WHERE id = ? AND status = 'completed'
        `,
        [rating, serviceId]
    );

    const [data] = await pool.query(
        `
        SELECT rating FROM services WHERE id = ?
        `,
        [serviceId]
    );

    return data[0];
};

export default updateRatingServiceByIdService;
