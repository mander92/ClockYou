import { v4 as uuid } from 'uuid';
import { ADMIN_EMAIL } from '../../../env.js';
import getPool from '../../db/getPool.js';
import Randomstring from 'randomstring';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const insertServiceService = async (
    typeOfServiceId,
    userId,
    dateTime,
    hours,
    comments,
    address,
    city,
    postCode
) => {
    const pool = await getPool();

    const [verify] = await pool.query(
        `
        SELECT id FROM users WHERE id = ?
        `,
        [userId]
    );

    if (!verify.length || verify[0].id !== userId)
        generateErrorUtil('Acceso denegado, el token no coincide', 409);

    const [existAddress] = await pool.query(
        `
        SELECT id FROM addresses WHERE address = ? AND city = ? AND postCode = ?
        `,
        [address, city, postCode]
    );

    const [existService] = await pool.query(
        `
        SELECT id FROM services WHERE typeOfServicesId = ? AND clientId = ? AND dateTime = ? AND hours = ? AND deletedAt IS NULL
        `,
        [typeOfServiceId, userId, dateTime, hours]
    );

    if (existAddress.length && existService.length)
        generateErrorUtil(
            'Ya has solicitado un servicio con estas características',
            401
        );

    const [price] = await pool.query(
        `
        SELECT price FROM typeOfServices WHERE id = ?
        `,
        [typeOfServiceId]
    );

    const resultPrice = price[0].price * hours;

    const addressId = uuid();

    await pool.query(
        `
        INSERT INTO addresses(id, address, city, postCode) VALUES (?,?,?,?)
        `,
        [addressId, address, city, postCode]
    );

    const validationCode = Randomstring.generate(30);

    const serviceId = uuid();

    await pool.query(
        `
        INSERT INTO services(id, dateTime, hours, comments, validationCode, clientId, addressId, typeOfServicesId, totalPrice) VALUES (?,?,?,?,?,?,?,?,?)
        `,
        [
            serviceId,
            dateTime,
            hours,
            comments,
            validationCode,
            userId,
            addressId,
            typeOfServiceId,
            resultPrice,
        ]
    );

    const [data] = await pool.query(
        `
        SELECT s.status,
        t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime, a.address, a.postCode, a.city, s.comments, u.email, u.firstName, u.lastName, u.phone
        FROM addresses a
        INNER JOIN services s
        ON a.id = s.addressId
        INNER JOIN users u
        ON u.id = s.clientId
        INNER JOIN typeOfServices t
        ON s.typeOfServicesId = t.id
        WHERE u.id = ? AND s.id = ?
        `,
        [userId, serviceId]
    );

    const utcDateTime = new Date(data[0].dateTime);

    const localDateTime = new Date(utcDateTime).toLocaleString();

    const emailSubject = `Nuevo pedido`;

    const emailBody = `
    <html>
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; " > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-provisiomal-para-mailing.png" alt="" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 15px; font-size: 20px"> Solicitud de Servicio </p> <p style="margin: 0 0 10px; font-size: 16px"> Tipo De Servicio: <br /> ${data[0].type} en ${data[0].province} </p> <p style="margin: 0 0 10px; font-size: 16px"> ${localDateTime} en Calle: ${data[0].address}, ${data[0].postCode}, ${data[0].city} </p> <p style="margin: 0 0 10px; font-size: 16px"> Total:${data[0].totalPrice}€ </p> <p style="margin: 25px 0 5px; font-size: 18px"> Por favor, confirme su petición haciendo click en el siguiente enlace: </p> <p style="margin: 50px 0 2px"> Gracias por confiar en ti mismo. </p> <p style="margin: 0 0 10px">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
        </body>
    </html>
`;

    await sendMailUtils(ADMIN_EMAIL, emailSubject, emailBody);

    return data[0];
};

export default insertServiceService;
