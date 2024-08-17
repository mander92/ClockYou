import { v4 as uuid } from 'uuid';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertTypeOfServiceService = async (type, description, city, price) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
        SELECT id FROM typeOfServices WHERE type = ? AND city = ?
            `,
        [type, city]
    );

    if (service.length) {
        generateErrorUtil('El servicio ya se encuentra registrado', 409);
    }

    await pool.query(
        `
            INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?,?,?,?,?)
            `,
        [uuid(), type, description, city, price]
    );
};

export default insertTypeOfServiceService;
