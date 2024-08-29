import getPool from '../../db/getPool.js';

const updateTypeOfServiceImageService = async (imageName, typeOfServiceId) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE typeOfServices
        SET image=?
        WHERE id=?
        `,
        [imageName, typeOfServiceId]
    );
};

export default updateTypeOfServiceImageService;
