import { v4 as uuid } from 'uuid';
import { PORT } from '../../../env.js';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const insertShiftRecordService = async (serviceId, employeeId, clientId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
      SELECT id FROM services WHERE id = ?
      `,
        [serviceId]
    );

    if (!service.length) {
        generateErrorUtil('El servicio no existe', 401);
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

    const idTurno = uuid();

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `,
        [idTurno, employeeId, serviceId]
    );

    const [pedido] = await pool.query(
        `
            SELECT s.status AS Estado,
            t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio_Hora, s.validationCode, s.hours AS Horas_Contratadas, s.totalPrice AS Precio_Total, s.date AS Fecha, s.startTime AS Hora_Inicio, 
            a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, s.comments AS Comenatarios, u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.phone AS Teléfono
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
                <h2>¡¡¡Hola ${pedido[0].Nombre} ${pedido[0].Apellidos}!!!</h2>
                <h3>Resumen de su pedido</h3>
                <p>Tipo De Servicio: ${pedido[0].Tipo_Servicio} en ${pedido[0].Provincia}</p>
                <p>${pedido[0].Fecha} a las ${pedido[0].Hora_Inicio} en Calle: ${pedido[0].Dirección}, ${pedido[0].CP}, ${pedido[0].Ciudad}</p>
                <p>Precio: ${pedido[0].Precio_Hora} * ${pedido[0].Horas_Contratadas} = ${pedido[0].Precio_Total}</p>
                <h3>Gracias por confiar en ClockYou.</h3>
                <h4>Por favor confirme su petición haga click</h4>
                <h3><a href="http://localhost:${PORT}/services/validate/${pedido[0].validationCode}">AQUÍ</a></h3>
                <h5>Hecho con ❤ por el equipo de ClockYou.</h5>
            </div>
        </body>
    </html>
`;

    await sendMailUtils(pedido[0].Email, emailSubject, emailBody);
};

export default insertShiftRecordService;
