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

    if (created.length) {
        generateErrorUtil('El turno ya está asignado', 401);
    }

    const [employee] = await pool.query(
        `
        SELECT id FROM users WHERE id = ? AND active = 1
        `,
        [employeeId]
    );

    if (!employee.length) {
        generateErrorUtil('El empleado no existe o inactivo', 401);
    }

    await pool.query(
        `
        UPDATE services SET status = 'accepted' WHERE id = ?
        `,
        [serviceId]
    );

    const id = uuid();

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `,
        [id, employeeId, serviceId]
    );

    const [pedido] = await pool.query(
        `
            SELECT s.status AS Estado,
            t.type AS Tipo_Servicio, t.city AS Provincia, s.validationCode, s.totalPrice AS Precio_Total, s.date AS Fecha, s.startTime AS Hora_Inicio, a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, u.email AS Email
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

    const emailSubject = `Su Servicio ha sido aceptado`;

    const emailBody = `
    <html>
        <body style="display: flex; justify-content: center; margin: 0;">
            <div style="text-align: center;">
                <h1>ClockYou</h1>
                <h2>Resumen de su pedido</h2>
                <h3>Tipo De Servicio: ${pedido[0].Tipo_Servicio} en ${pedido[0].Provincia}</h3>
                <h3>${pedido[0].Fecha} a las ${pedido[0].Hora_Inicio} en Calle: ${pedido[0].Dirección}, ${pedido[0].CP}, ${pedido[0].Ciudad}</h3>
                <h3>Total:${pedido[0].Precio_Total}€</h3>
                <h3>Por favor confirme su petición</h3>
                <h2><a href="http://localhost:${PORT}/services/validate/${pedido[0].validationCode}">AQUÍ</a></h2>
                <h4>Gracias por confiar en ClockYou.</h4>
            </div>
        </body>
    </html>
`;

    await sendMailUtils(pedido[0].Email, emailSubject, emailBody);
};

export default insertShiftRecordService;
