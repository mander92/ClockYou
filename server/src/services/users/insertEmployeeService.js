import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertEmployeeService = async (email,
    password,
    userName,
    firstName,
    lastName,
    dni,
    phone,
    address,
    postCode,
    city,) => {
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

    const [name] = await pool.query(
        `
            SELECT id FROM users WHERE userName = ?
        `,
        [userName]
    );

    if (name.length) {
        generateErrorUtil(
            'El nombre de usuario ya se encuentra registrado',
            409
        );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const addressId = uuid()

    await pool.query(
      `
      INSERT INTO addresses(id, address, city, postCode) VALUES(?,?,?,?)
      `,[addressId, address, city, postCode]
    )
  
    await pool.query(
      `
              INSERT INTO users(id, email, password, userName, firstName, lastName, dni, phone, addressId,role )
              VALUES (?,?,?,?,?,?,?,?,?,?)
          `,
      [uuid(), email, passwordHashed, userName, firstName, lastName, dni, phone, addressId ,'employee']
    );
  
    await pool.query(
        `
            UPDATE users SET active=1
        `
    );
};

export default insertEmployeeService;
