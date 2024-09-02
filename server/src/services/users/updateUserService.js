import getPool from '../../db/getPool.js';

const updateUserService = async (userId, firstName, lastName, phone) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE users SET firstName=?, lastName=?, phone=? WHERE id=?
        `,
        [firstName, lastName, phone, userId]
    );

    const [data] = await pool.query(
        `
        SELECT firstName, lastName, phone FROM users WHERE id = ?
        `,
        [userId]
    );

    return data[0];
};

export default updateUserService;
