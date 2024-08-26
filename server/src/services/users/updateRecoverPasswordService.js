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
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; " > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/logo-provisiomal-para-mailing.png" alt="" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 5px; font-size: 16px"> Se ha solicitado la recuperación de la contraseña para el siguiente email </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff"> ${email} </p> <p style="margin: 35px 0 5px; font-size: 16px"> Utilice el siguiente código de recuperación para crear una nueva contraseña: </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff"> ${recoverPasswordCode} </p> <p style="margin: 70px 0 2px"> Gracias por confiar en ClockYou. </p> <p style="margin: 0 0 10px">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table>
        </body>
    </html>
`;
  await sendMailUtil(email, subject, body);
};

export default updateRecoverPasswwordService;
