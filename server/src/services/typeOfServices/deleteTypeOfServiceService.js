import getPool from '../../db/getPool.js';

const deleteTypeOfServiceService = async (typeOfServiceId) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE typeOfServices SET deletedAt = NOW() WHERE id = ?
        `,
        [typeOfServiceId]
    );

    const [data] = await pool.query(
        `
        SELECT type, city FROM typeOfServices WHERE id = ? 
        `,
        [typeOfServiceId]
    );

    return data[0];
};

export default deleteTypeOfServiceService;
