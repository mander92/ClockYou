import getPool from '../../db/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        
        `UPDATE users
        SET recoverPassCode=?
        WHERE email=?`
        ,
        [recoverPassCode, email]
    );

    const subject = 'Recuperación de contraseña Clock You';

    const body = 
    `Se ha solicitado la recuperación de la contraseña de Clock You para este ${email}.
    Utiliza el siguiente código de recuperación para crear una nueva contraseña ${recoverPassCode}
    Si no ha sido usted, ignore este mensaje.`
    ;

    await sendMailUtil(email, subject, body);
};

export default updateRecoverPassService;