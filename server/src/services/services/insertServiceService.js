import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';

const insertServiceService = async (
    clientId,
    typeOfServiceId,
    date,
    hours,
    description,
    address,
    numberOfEmployee,
    city,
    postCode
) => {
    const pool = await getPool();

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
        INSERT INTO services(id, date, hours,description, clientId, addressId, typeOfServicesId) VALUES(?, ?, ?, ?, ?, ?, ?)
        `,
        [
            id,
            date,
            hours,
            description,
            clientId,
            addressId[0].id,
            typeOfServiceId,
        ]
    );

    const [data] = await pool.query(
        `
        SELECT t.type, t.city, t.description, t.price, s.date, s.hours, s.description, s.rating, s.status
        FROM typeOfServices t
        INNER JOIN services s
        ON t.id = s.typeOfServicesId
        WHERE s.id = ?
        `,
        [id]
    );

    return data;
};

export default insertServiceService;
