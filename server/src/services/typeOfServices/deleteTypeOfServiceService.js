import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteTypeOfServiceService = async (typeOfServiceId) => {
    const pool = await getPool();

    await pool.query(
        `
        DELETE FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );
};

export default deleteTypeOfServiceService;
