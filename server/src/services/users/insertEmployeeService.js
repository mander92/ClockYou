import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertEmployeeService = async (
    email,
    password,
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

    const passwordHashed = await bcrypt.hash(password, 10);

    await pool.query(
        `
              INSERT INTO users(id, email, password, firstName, lastName, dni, phone, role, job, city, active )
              VALUES (?,?,?,?,?,?,?,?,?,?,?)
          `,
        [
            uuid(),
            email,
            passwordHashed,
            firstName,
            lastName,
            dni,
            phone,
            'employee',
            job,
            city,
            1,
        ]
    );
};

export default insertEmployeeService;
