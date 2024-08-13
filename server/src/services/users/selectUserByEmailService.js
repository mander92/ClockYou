import getPool from '../../db/getPool.js';

const selectUserByEmailService = async (email) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id, password, email, role, recoverPassCode, active
        FROM users
        WHERE email = ?
        `,
        [email]
    );
    return user[0];
};

export default selectUserByEmailService;
