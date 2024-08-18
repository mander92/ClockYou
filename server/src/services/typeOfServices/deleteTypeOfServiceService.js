import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteTypeOfServiceService = async (typeOfServiceId) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE typeOfServices SET active = 'paused' WHERE id = ?
        `,
        [typeOfServiceId]
    );
};

export default deleteTypeOfServiceService;
