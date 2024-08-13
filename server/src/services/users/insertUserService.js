import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtils.js';
import { PORT } from '../../../env.js';

const insertUserService = async (
  email,
  password,
  username,
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
    throw generateErrorUtil('El email ya se encuentra registrado', 409);
  }

  const emailSubject = `Activa tu cuenta de ClockYou`;

  const emaiBody = `
                !!Bienvenid@ ${username}¡¡

                Gracias por registrarte en ClockYou. Para activar tu cuenta haga click
                en el siguiente enlace:

                <a href="http://localhost:${PORT}/users/validate/${registrationCode}">Activar Cuenta</a>               

                Hecho con ❤ por el equipo de ClockYou.
    `;

  await sendMailUtils(email, emailSubject, emaiBody);

  const passwordHashed = await bcrypt.hash(password, 10);

  await pool.query(
    `
            INSERT INTO users (email, password, registrationCode, username)
            VALUES (?,?,?,?)
        `,
    [email, passwordHashed, registrationCode, username]
  );
};

export default insertUserService;
