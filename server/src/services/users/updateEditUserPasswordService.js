import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateChangeUserPasswordService = async (
    userId,
    actualPassword,
    newPassword
) => {
    const pool = await getPool();

    const [password] = await pool.query(
        `
        SELECT password FROM users WHERE id = ? 
        `,
        [userId]
    );

    const isMatch = await bcrypt.compare(actualPassword, password[0].password);

    if (!isMatch) {
        generateErrorUtil('La contraseña actual no coincide', 409);
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
        UPDATE users SET password = ? WHERE id = ?
        `,
        [hashPassword, userId]
    );
};

export default updateChangeUserPasswordService;
