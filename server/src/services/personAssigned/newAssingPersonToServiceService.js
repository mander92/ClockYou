import { v4 as uuid } from 'uuid';
import { ADMIN_EMAIL } from '../../../env.js';
import getPool from '../../db/getPool.js';
import Randomstring from 'randomstring';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtils from '../../utils/sendMailUtil.js';

const newAssingPersonToServiceService = async (employeeId, serviceId) => {
    const pool = await getPool();

    console.log(typeof serviceId === 'string');

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
    console.log('AQUIIIII');
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
        `, [personAssignedId, employeeId, serviceId, pin])

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

    return data;
};

export default newAssingPersonToServiceService;
