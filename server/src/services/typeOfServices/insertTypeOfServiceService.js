import { v4 as uuid } from 'uuid';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertTypeOfServiceService = async (
    type,
    description,
    city,
    price,
    imageName
) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
        SELECT id FROM typeOfServices WHERE type = ? AND city = ? AND deletedAt IS NULL
        `,
        [type, city]
    );

    if (service.length)
        generateErrorUtil('El servicio ya se encuentra registrado', 409);

    const id = uuid();

    await pool.query(
        `
        INSERT INTO typeOfServices (id, type, description, city, price, image) VALUES (?,?,?,?,?,?)
        `,
        [id, type, description, city, price, imageName]
    );
};

export default insertTypeOfServiceService;
