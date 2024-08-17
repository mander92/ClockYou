import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import sendMailUtil from "../../utils/sendMailUtil.js";
import { PORT } from "../../../env.js";

const insertUserService = async (email, password, userName, firstName, lastName, dni, phone, address, postCode, city,
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
    generateErrorUtil("El email ya se encuentra registrado", 409);
  }

  const [name] = await pool.query(
    `
            SELECT id FROM users WHERE userName = ?
        `,
    [userName]
  );

  if (name.length) {
    generateErrorUtil("El nombre de usuario ya se encuentra registrado", 409);
  }

  const emailSubject = `Activa tu cuenta de ClockYou`;

  const emailBody = `
                !!Bienvenid@ ${userName}¡¡

                Gracias por registrarte en ClockYou. Para activar tu cuenta haga click
                en el siguiente enlace:

                <a href="http://localhost:${PORT}/users/validate/${registrationCode}">Activar Cuenta</a>               

                Hecho con ❤ por el equipo de ClockYou.
    `;

  await sendMailUtil(email, emailSubject, emailBody);

  const passwordHashed = await bcrypt.hash(password, 10);

  const addressId = uuid()

  await pool.query(
    `
    INSERT INTO addresses(id, address, city, postCode) VALUES(?,?,?,?)
    `,[addressId, address, city, postCode]
  )

  await pool.query(
    `
            INSERT INTO users(id, email, password, userName, firstName, lastName, dni, phone, addressId,registrationCode )
            VALUES (?,?,?,?,?,?,?,?,?,?)
        `,
    [uuid(), email, passwordHashed, userName, firstName, lastName, dni, phone, addressId ,registrationCode]
  );
};

export default insertUserService;
