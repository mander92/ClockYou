import getPool from '../../db/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPasswwordService = async (email, recoverPasswordCode) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE users
        SET recoverPasswordCode=?
        WHERE email=?`,
        [recoverPasswordCode, email]
    );

    const subject = 'Recuperación de contraseña ClockYou';

    const body = `
    <html>
        <body style="display: flex; justify-content: center; margin: 0;">
            <div style="text-align: center;">
                <h1>ClockYou</h1>
                <h3>Se ha solicitado la recuperación de la contraseña para este email</h3>
                <h3>${email}</h3>
                <h4>Utiliza el siguiente código de recuperación para crear una nueva contraseña</h4>
                <h4>${recoverPasswordCode}</h4>
                <h5>Si no ha sido usted, ignore este mensaje.</h5>
            </div>
        </body>
    </html>
`;
    await sendMailUtil(email, subject, body);
};

export default updateRecoverPasswwordService;
