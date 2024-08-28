import getPool from '../../db/getPool.js';

const deleteUserStateService = async (userId) => {
    const pool = await getPool();

    const [email] = await pool.query(
        `
        SELECT email, dni FROM users WHERE id = ?
        `,
        [userId]
    );

    const deletedEmail = '*' + email[0].email + '*';

    const deletedDni = '*' + email[0].dni + '*';

    await pool.query(
        `
        UPDATE users SET active = 0, deletedAt = CURRENT_TIMESTAMP, dni = ?, email = ? WHERE id = ?
        `,
        [deletedDni, deletedEmail, userId]
    );
};

export default deleteUserStateService;
