import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateChangeUserPasswordService = async (
    recoverPasswordCode,
    newPassword
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id, recoverPasswordCode FROM users WHERE recoverPasswordCode = ?
        `,
        [recoverPasswordCode]
    );

    if (!user.length || user[0].recoverPasswordCode !== recoverPasswordCode)
        generateErrorUtil('Código de recuperación incorrecto', 409);

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
        UPDATE users
        SET password=?, recoverPasswordCode=null
        WHERE recoverPasswordCode=?
        `,
        [hashPassword, recoverPasswordCode]
    );
};

export default updateChangeUserPasswordService;
