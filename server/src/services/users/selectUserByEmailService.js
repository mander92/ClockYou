import getPool from '../../db/getPool.js';

const selectUserByEmailService = async (recoverPasswordCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id, password, email, role, recoverPasswordCode, active
        FROM users
        WHERE recoverPasswordCode = ?
        `,
        [recoverPasswordCode]
    );
    return user[0];
};

export default selectUserByEmailService;
