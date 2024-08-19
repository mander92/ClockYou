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
                !!Bienvenid@ ${firstName} ${lastName}¡¡

                Gracias por registrarte en ClockYou. Para activar tu cuenta haga click
                en el siguiente enlace:

                <a href="http://localhost:${PORT}/users/validate/${registrationCode}">Activar Cuenta</a>               

                Hecho con ❤ por el equipo de ClockYou.
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
