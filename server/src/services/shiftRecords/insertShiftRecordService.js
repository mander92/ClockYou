import { v4 as uuid } from 'uuid';
import { PORT } from '../../../env.js';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const insertShiftRecordService = async (serviceId, employeeId) => {
    const pool = await getPool();

    const [created] = await pool.query(
        `
        SELECT id FROM shiftRecords WHERE serviceId = ? AND employeeId = ?
        `,
        [serviceId, employeeId]
    );

    if (created.length) generateErrorUtil('El turno ya está asignado', 401);

    const [employee] = await pool.query(
        `
        SELECT id, active FROM users WHERE id = ?
        `,
        [employeeId]
    );

    if (!employee.length || employee[0].active !== 1)
        generateErrorUtil('El empleado no existe o está inactivo', 401);

    const id = uuid();

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `,
        [id, employeeId, serviceId]
    );

    await pool.query(
        `
        UPDATE services SET status = 'accepted' WHERE id = ?
        `,
        [serviceId]
    );

    const [pedido] = await pool.query(
        `
        SELECT s.status AS Estado,
        t.type AS TipoServicio, t.city AS Provincia, s.validationCode, s.totalPrice AS PrecioTotal, s.dateTime AS DíaYHora, a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, u.email AS Email
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

    const utcDateTime = new Date(pedido[0].DíaYHora);

    const localDateTime = new Date(utcDateTime).toLocaleString();

    const emailSubject = `Su Servicio ha sido aceptado`;

    const emailBody = `
    <html>
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; " > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/logo-provisiomal-para-mailing.png" alt="" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 15px; font-size: 20px"> Resumen de su pedido </p> <p style="margin: 0 0 10px; font-size: 16px"> Tipo De Servicio: <br /> ${pedido[0].TipoServicio} en ${pedido[0].Provincia} </p> <p style="margin: 0 0 10px; font-size: 16px"> ${localDateTime} en Calle: ${pedido[0].Dirección}, ${pedido[0].CP}, ${pedido[0].Ciudad} </p> <p style="margin: 0 0 10px; font-size: 16px"> Total:${pedido[0].PrecioTotal}€ </p> <p style="margin: 25px 0 5px; font-size: 18px"> Por favor, confirme su petición haciendo click en el siguiente enlace: </p> <p> <a style=" display: inline-block; margin: 0 0 5px; padding: 10px 25px 15px; background-color: #008aff; font-size: 20px; color: #fff; width: auto; text-decoration: none; font-weight: bold; " href="http://localhost:${PORT}/services/validate/${pedido[0].validationCode}" >Confirmar petición</a > </p> <p style="margin: 50px 0 2px"> Gracias por confiar en ClockYou. </p> <p style="margin: 0 0 10px">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
        </body>
    </html>
`;

    await sendMailUtils(pedido[0].Email, emailSubject, emailBody);
};

export default insertShiftRecordService;
