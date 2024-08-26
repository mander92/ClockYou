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

    const [data] = await pool.query(
        `
        SELECT type, description, city, price FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );

    return data[0];
};

export default updateTypeOfServiceService;
