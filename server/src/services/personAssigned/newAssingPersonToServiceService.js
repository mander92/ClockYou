import { v4 as uuid } from 'uuid';
import { CLIENT_URL } from '../../../env.js';;
import getPool from '../../db/getPool.js';
import Randomstring from 'randomstring';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const newAssingPersonToServiceService = async (employeeId, serviceId) => {
    const pool = await getPool();

    const [verifyUserId] = await pool.query(
        `
        SELECT * FROM users WHERE id = ? AND active = 1
        `,
        [employeeId]
    );

    const [verifyServiceId] = await pool.query(
        `
        SELECT id FROM services WHERE id = ?
        `,
        [serviceId]
    );

    if (!verifyUserId) {
        generateErrorUtil('El usuario no existe', 402);
    }

    if (!verifyServiceId) {
        generateErrorUtil('El servicio no existe', 402);
    }

    const [personAlreadyAssigned] = await pool.query(`
        SELECT * FROM personsassigned WHERE employeeId = ? AND serviceId = ?
        `, [employeeId, serviceId])


    if (personAlreadyAssigned.length > 0) {
        generateErrorUtil('La persona ya ha sido asignada al servicio');
    }

    const personAssignedId = uuid();
    const pin = Randomstring.generate(4);

    await pool.query(`
        INSERT INTO personsassigned(id, employeeId, serviceId, pin) VALUES(?,?,?,?)
        `, [personAssignedId, employeeId, serviceId, pin]);

    const [data] = await pool.query(
        `
            SELECT pa.pin, s.status,
            t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.startDateTime, s.comments, u.email, u.firstName, u.lastName, u.phone
            FROM users u
            INNER JOIN personsassigned pa
            ON u.id = pa.employeeId
            INNER JOIN services s
            ON s.id = pa.serviceId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.id = ?
        `,
        [employeeId, serviceId]
    );

    const [serviceInfo] = await pool.query(
        `
            SELECT pa.pin, s.status,
            t.type, t.city AS province, s.validationCode, s.totalPrice, s.startDateTime, a.address, a.postCode, a.city, u.email
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN personsassigned pa 
            ON s.id = pa.serviceId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE s.id = ? AND pa.employeeId = ?
            `,
        [serviceId, employeeId]
    );

    const emailSubjectEmployee = `Has sido asignado a un servicio`;

    const localDateTime = new Date(serviceInfo[0].startDateTime).toLocaleString();

    const emailBodyEmployee = `
        <html>
            <body>
                <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; color: #fff;" > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-email.png" alt="Logo" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff;"> Resumen de su pedido </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;"> Tipo De Servicio: ${serviceInfo[0].type} en ${serviceInfo[0].province} </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;">El ${localDateTime} en Calle: ${serviceInfo[0].address}, ${serviceInfo[0].postCode}, ${serviceInfo[0].city} </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;"> Total: ${serviceInfo[0].totalPrice}€ </p>  <br /> <p style="margin: 50px 0 2px; color: #fff;"> Gracias por confiar en ClockYou. </p style="margin: 50px 0 2px; color: #fff;>Para fichar en el servicio puedes hacerlo con tu clave: ${serviceInfo.pin} (recuerda que es secreta)<p></p> < style="margin: 50px 0 2px; color: #fff;a href=${CLIENT_URL}/clockpage>Ficha aquí</a> <p style="margin: 0 0 10px; color: #fff;">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
            </body>
        </html>
    `;

    await sendMailUtils(serviceInfo[0].email, emailSubjectEmployee, emailBodyEmployee);

    const [verifyStatus] = await pool.query(`
        SELECT status FROM services WHERE id = ?
        `, [serviceId]);

    if (verifyStatus === 'pending') {
        await pool.query(`
            UPDATE services SET status = 'confirmed' WHERE id = ?
            `, [serviceId]);

        const [pedido] = await pool.query(
            `
                SELECT s.status,
                t.type, t.city AS province, s.validationCode, s.totalPrice, s.startDateTime, a.address, a.postCode, a.city, u.email
                FROM addresses a
                INNER JOIN services s
                ON a.id = s.addressId
                INNER JOIN users u
                ON u.id = s.clientId
                INNER JOIN typeOfServices t
                ON s.typeOfServicesId = t.id
                WHERE s.id = ? AND s.deletedAt IS NULL
                `,
            [serviceId]
        );

        const localDateTime = new Date(pedido[0].startDateTime).toLocaleString();

        const emailSubject = `Su Servicio ha sido aceptado`;

        const emailBody = `
            <html>
                <body>
                    <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; color: #fff;" > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-email.png" alt="Logo" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff;"> Resumen de su pedido </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;"> Tipo De Servicio: ${pedido[0].type} en ${pedido[0].province} </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;">El ${localDateTime} en Calle: ${pedido[0].address}, ${pedido[0].postCode}, ${pedido[0].city} </p> <p style="margin: 0 0 10px; font-size: 16px; color: #fff;"> Total: ${pedido[0].totalPrice}€ </p>  <br /> <p style="margin: 50px 0 2px; color: #fff;"> Gracias por trabajar en ClockYou. </p> <p style="margin: 0 0 10px; color: #fff;">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
                </body>
            </html>
        `;

        await sendMailUtils(pedido[0].email, emailSubject, emailBody);

    };

    return data;
};

export default newAssingPersonToServiceService;
