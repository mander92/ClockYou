import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { PORT } from '../../../env.js';

const insertUserService = async (
  email,
  password,
  firstName,
  lastName,
  dni,
  phone,
  registrationCode
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

  const emailSubject = `Activa tu cuenta de ClockYou`;

  const emailBody = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
            <title>Volver a Madrid tiene premio</title>
        </head>

        <body>
            <table
            bgcolor="#3c3c3c"
            width="670"
            border="0"
            cellspacing="0"
            cellpadding="0"
            align="center"
            style="margin: 0 auto"
            >
            <tbody>
                <tr>
                <td>
                    <table
                    bgcolor="#3c3c3c"
                    width="670"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    align="left"
                    >
                    <tbody>
                        <tr>
                        <td
                            align="left"
                            style="
                            padding: 20px 40px;
                            color: #fff;
                            font-family: system-ui, -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                'Open Sans', 'Helvetica Neue', sans-serif;
                            "
                        >
                            <p
                            style="
                                margin: 10px 0 20px;
                                font-size: 35px;
                                font-weight: bold;
                            "
                            >
                            <img
                                src="https://raw.githubusercontent.com/mander92/ClockYou/main/logo-provisiomal-para-mailing.png"
                                alt="ClockYou"
                                style="width: 40px; margin: 0 -3px -7px 0"
                            />
                            ClockYou
                            </p>
                            <p style="margin: 0 0 5px; font-size: 25px; height: 28px">
                            Bienvenid@, ${firstName} ${lastName}!!!
                            </p>
                            <p style="margin: 15px 0 5px; font-size: 20px">
                            Muchas gracias por registrarte en ClockYou.
                            <span
                                style="
                                display: block;
                                font-size: 18px;
                                margin: 25px 0 0;
                                "
                            >
                                Para continuar, activa tu cuenta haciendo click en el
                                <br />
                                siguiente enlace:
                            </span>
                            </p>
                            <p>
                            <a
                                href="http://localhost:${PORT}/users/validate/${registrationCode}"
                                style="
                                display: inline-block;
                                margin: 0 0 5px;
                                padding: 10px 25px 15px;
                                background-color: #008aff;
                                font-size: 20px;
                                color: #fff;
                                width: auto;
                                text-decoration: none;
                                font-weight: bold;
                                "
                                >Activa tu cuenta</a
                            >
                            </p>
                            <p style="margin: 50px 0 10px">&copy; ClockYou 2024</p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
        </body>
    </html>
`;

  await sendMailUtil(email, emailSubject, emailBody);

  const passwordHashed = await bcrypt.hash(password, 10);

  await pool.query(
    `
            INSERT INTO users(id, email, password, firstName, lastName, dni, phone, registrationCode )
            VALUES (?,?,?,?,?,?,?,?)
        `,
    [
      uuid(),
      email,
      passwordHashed,
      firstName,
      lastName,
      dni,
      phone,
      registrationCode,
    ]
  );
};

export default insertUserService;
