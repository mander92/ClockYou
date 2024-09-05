import getPool from '../../db/getPool.js';

const updateUserService = async (userId, firstName, lastName, phone) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE users SET firstName=?, lastName=?, phone=? WHERE id=?
        `,
        [firstName, lastName, phone, userId]
    );
};

export default updateUserService;
