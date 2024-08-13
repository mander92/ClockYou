import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserRegisterService = async (registrationCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id FROM users WHERE registrationCode=?
        `,
        [registrationCode]
    );

    if (!user.length)
        throw generateErrorUtil('No existe este código de registro', 400);

    await pool.query(
        `
            UPDATE users
            SET active = true, registrationCode = null
            WHERE registrationCode=?
            `,
        [registrationCode]
    );
};

export default updateUserRegisterService;
