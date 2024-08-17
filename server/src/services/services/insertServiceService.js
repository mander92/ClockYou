import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';

const insertServiceService = async (
    typeOfServiceId,
    startTime,
    endTime,
    startDate,
    endDate,
    description,
    address,
    city,
    postCode
) => {
    const pool = await getPool();

    const [typeId] = await pool.query(
        `
        SELECT id FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );

    await pool.query(
        `
        INSERT INTO addresses(id, address, city, postCode) VALUES (?,?,?,?)
        `,
        [uuid(), address, city, postCode]
    );

    const [addressId] = await pool.query(
        `
        SELECT id FROM addresses WHERE address = ?
        `,
        [address]
    );

    const id = uuid();
    await pool.query(
        `
        INSERT INTO services(id, startDate, endDate, startTime, endTime, description, addressId, typeOfServicesId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            id,
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            addressId[0].id,
            typeId[0].id,
        ]
    );

    const [data] = await pool.query(
        `
        SELECT * FROM services WHERE id = ?
        `,
        [id]
    );

    return data;
};

export default insertServiceService;
