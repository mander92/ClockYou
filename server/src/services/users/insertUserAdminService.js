import { v4 as uuid } from 'uuid';
import sendMailUtils from '../../utils/sendMailUtil.js';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { CLIENT_URL } from '../../../env.js';
import randomstring from 'randomstring';

const insertAdminService = async (
    role,
    email,
    firstName,
    lastName,
    dni,
    phone,
    job,
    city
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if (user.length) {
        generateErrorUtil('El email ya se encuentra registrado', 409);
    }

    const recoverPasswordCode = randomstring.generate(10);
    const defaultPassword = uuid();
    const id = uuid();

    await pool.query(
        `
              INSERT INTO users(id, email, firstName, lastName, password, dni, phone, recoverPasswordCode, role, job, city, active )
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
          `,
        [
            id,
            email,
            firstName,
            lastName,
            defaultPassword,
            dni,
            phone,
            recoverPasswordCode,
            role,
            job,
            city,
            1,
        ]
    );

    const emailSubject = `Tu cuenta de ClockYou ha sido creada`;

    const emailBody = `
    <html>
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; " > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-provisiomal-para-mailing.png" alt="" style="width: 40px; margin: 0 -3px -7px 0" /> ClockYou </p> <p style="margin: 0 0 5px; font-size: 25px;"> Bienvenid@, ${firstName} ${lastName}!!! </p> <p style="margin: 15px 0 5px; font-size: 20px"> Tu cuenta ha sido creado por la administración de ClockYou. <span style=" display: block; font-size: 18px; margin: 25px 0 0; " > Para continuar, cambia la contraseña utilizando el siguiente código de recuperación: ${recoverPasswordCode}<br /> siguiente enlace: </span> </p> <p> <a href="${CLIENT_URL}/password" style=" display: inline-block; margin: 0 0 5px; padding: 10px 25px 15px; background-color: #008aff; font-size: 20px; color: #fff; width: auto; text-decoration: none; font-weight: bold; " >Cambiar mi contraseña</a > </p> <p style="margin: 50px 0 10px">&copy; ClockYou 2024 ❤</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
        </body>
    </html>
`;

    await sendMailUtils(email, emailSubject, emailBody);
};

export default insertAdminService;
