import getPool from '../../db/getPool.js';

const updateTypeOfServiceService = async (
    typeOfServiceId,
    type,
    city,
    description,
    price
) => {
    const pool = await getPool();

    await pool.query(
        'UPDATE typeOfServices SET type = ?, description = ?, city = ?, price = ? WHERE id = ?',
        [type, description, city, price, typeOfServiceId]
    );
};

export default updateTypeOfServiceService;
