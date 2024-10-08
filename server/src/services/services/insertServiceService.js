import { v4 as uuid } from 'uuid';
import { ADMIN_EMAIL } from '../../../env.js';
import getPool from '../../db/getPool.js';
import Randomstring from 'randomstring';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const insertServiceService = async (
    typeOfServiceId,
    userId,
    startDateTime,
    hours,
    numberOfPeople,
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
        SELECT id FROM services WHERE typeOfServicesId = ? AND clientId = ? AND startDateTime = ? AND hours = ? AND deletedAt IS NULL
        `,
        [typeOfServiceId, userId, startDateTime, hours]
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

    const resultPrice = price[0].price * hours * numberOfPeople;

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
        INSERT INTO services(id, startDateTime, hours, numberOfPeople, comments, validationCode, clientId, addressId, typeOfServicesId, totalPrice) VALUES (?,?,?,?,?,?,?,?,?,?)
        `,
        [
            serviceId,
            startDateTime,
            hours,
            numberOfPeople,
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
        t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.startDateTime, a.address, a.postCode, a.city, s.comments, u.email, u.firstName, u.lastName, u.phone
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

    const utcDateTime = new Date(data[0].startDateTime);

    const localDateTime = new Date(utcDateTime).toLocaleString();

    const emailSubject = `Nuevo pedido`;

    const emailBody = `
    <html>
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; color: #fff; " > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-email.png" alt="Logo" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff;"> ${data[0].type} en ${data[0].province}</p> <br /></p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;"> El ${localDateTime} en Calle: ${data[0].address}, ${data[0].postCode}, ${data[0].city} </p> <p style="margin: 25px 0 5px; font-size: 18px; color: #fff;"> Por favor, asigne un empleado para continuar con el proceso.</p> <p style="margin: 50px 0 2px; color: #fff;"> Gracias por confiar en nosotros. </p> <p style="margin: 0 0 10px; color: #fff;">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
        </body>
    </html>
`;

    await sendMailUtils(ADMIN_EMAIL, emailSubject, emailBody);

    return data[0];
};

export default insertServiceService;
