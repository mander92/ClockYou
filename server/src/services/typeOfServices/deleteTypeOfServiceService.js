import getPool from '../../db/getPool.js';

const deleteTypeOfServiceService = async (typeOfServiceId) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE typeOfServices SET deletedAt = NOW() WHERE id = ?
        `,
        [typeOfServiceId]
    );
};

export default deleteTypeOfServiceService;
