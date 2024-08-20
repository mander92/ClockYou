import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertServiceService = async (
    userId,
    typeOfServiceId,
    date,
    hours,
    comments,
    address,
    city,
    postCode
) => {
    const pool = await getPool();

    const [price] = await pool.query(
        `
        SELECT price FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );

    const resultPrice = price[0].price * hours;

    const [clientId] = await pool.query(
        `
        SELECT id FROM users WHERE id = ?
        `,
        [userId]
    );

    if (!clientId) {
        generateErrorUtil('Token inválido', 409);
    }

    const addressId = uuid();

    await pool.query(
        `
        INSERT INTO addresses(id, address, city, postCode) VALUES (?,?,?,?)
        `,
        [addressId, address, city, postCode]
    );

    await pool.query(
        `
        INSERT INTO services(id, date, hours, comments, clientId, addressId, typeOfServicesId, totalPrice) VALUES (?,?,?,?,?,?,?,?)
        `,
        [
            uuid(),
            date,
            hours,
            comments,
            clientId[0].id,
            addressId,
            typeOfServiceId,
            resultPrice,
        ]
    );

    const [data] = await pool.query(
        `
            SELECT s.status AS Estado, s.createdAt AS Creación, 
            t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio, 
            a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, 
            s.date AS Fecha, s.hours AS Horas, s.totalPrice AS Precio_Total, s.comments AS Descripción, 
            u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.dni AS DNI, u.phone AS Teléfono
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ?
        `,
        [clientId[0].id]
    );

    return data;
};

export default insertServiceService;
