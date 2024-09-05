import getPool from '../../db/getPool.js';

const updateTypeOfServiceService = async (
    typeOfServiceId,
    description,
    price
) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE typeOfServices SET description = ?, price = ? WHERE id = ?
        `,
        [description, price, typeOfServiceId]
    );
};

export default updateTypeOfServiceService;
