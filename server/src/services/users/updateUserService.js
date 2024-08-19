import getPool from '../../db/getPool.js';

const updateUserService = async (userId, firstName, lastName, dni, phone) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE users SET firstName=?, lastName=?, dni=?, phone=? WHERE id=?
        `,
        [firstName, lastName, dni, phone, userId]
    );
};

export default updateUserService;
