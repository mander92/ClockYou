import { v4 as uuid } from 'uuid';
import {PORT} from '../../../env.js';
 
import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import sendMailUtils from "../../utils/sendMailUtil.js";

const insertShiftService = async (serviceId, employeeId, clientId) => {

    const pool = await getPool();
    
    const [service] = await pool.query(
        `
        SELECT * FROM services WHERE id = ?
        `,[serviceId]
    );

    if(!service.length){
        generateErrorUtil('El servicio no existe', 401)
    };

    const [employee] = await pool.query(
        `
        SELECT * FROM users WHERE id = ? AND active = 1
        `,[employeeId]
    );

    if(!employee.length){
        generateErrorUtil('El empleado no existe o inactivo', 401)
    };

    await pool.query(
        `
        UPDATE services SET status = 'accepted' WHERE id = ?
        `,[serviceId]
    );

    const idTurno = uuid();

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `, [idTurno,employeeId,serviceId]
    );

    const [pedido] = await pool.query(
        `
            SELECT s.id, t.city, t.description, t.price, t.type, s.status, s.hours, s.validationCode, s.date, s.totalprice, a.address, a.postcode, u.id, u.firstName, u.lastName   
            FROM typeofservices t
            INNER JOIN services s
            ON t.id = s.typeofservicesId
            INNER JOIN addresses a
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            WHERE s.id = ? 
        `,[serviceId]
    );

    const [userClient] = await pool.query(
        `
        SELECT * FROM users WHERE id = ? 
        `,[clientId]
    );

    console.log(userClient)

    if(!userClient.length){
        generateErrorUtil('No existe usuario cliente o incativo', 401)
    };

    const emailSubject = `Su Servicio ha sido acceptado`;

    const emailBody = `
    <html>
        <body style="display: flex; justify-content: center; margin: 0;">
            <div style="text-align: center;">
                <h1>ClockYou</h1>
                <h2>¡¡¡Hola ${userClient[0].firstName} ${userClient[0].lastName}!!!</h2>
                <h3>Resumen de su pedido</h3>
                <h2>${pedido[0].id}</h2>
                <p>ciudad: ${pedido[0].city}</p>
                <p>decripcion: ${pedido[0].description}</p>
                <p>horas: ${pedido[0].hours}</p>
                <p>fecha: ${pedido[0].date}</p>
                <h3>Gracias por confiar en ClockYou.</h3>
                <h4>Por favor confirme su petición haga click <a href="http://localhost:${PORT}/services/validate/${pedido[0].validationCode}">Aquí</a></h4>
                <h5>Hecho con ❤ por el equipo de ClockYou.</h5>
            </div>
        </body>
    </html>
`;

    await sendMailUtils(userClient[0].email, emailSubject, emailBody);

    return 


}

export default insertShiftService;