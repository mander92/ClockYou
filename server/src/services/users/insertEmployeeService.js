import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const insertEmployeeService = async (email, password, userName) => {
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

  const passwordHashed = await bcrypt.hash(password, 10);

  await pool.query(
    `
            INSERT INTO users (id, email, password,  userName, role)
            VALUES (?,?,?,?,?)
        `,
    [uuid(), email, passwordHashed, userName, "employee"]
  );
};

export default insertEmployeeService;
