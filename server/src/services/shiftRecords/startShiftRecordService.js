import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { v4 as uuid } from 'uuid';

const startShiftRecordService = async (
    location, startDateTime, employeeId, serviceId
) => {
    const latitudeIn = location[0];
    const longitudeIn = location[1];
    const pool = await getPool();
    // const [verify] = await pool.query(
    //     `
    //     SELECT id FROM personsassigned WHERE employeeId = ? AND serviceId = ?
    //     `,
    //     [employeeId, serviceId]
    // );

    // if (verify[0].clockIn !== null)
    //     generateErrorUtil('No has sido asignado al servicio contacta con administración', 401);

    const id = uuid();

    await pool.query(
        `
         INSERT INTO shiftrecords(id, clockIn, employeeId, serviceId, latitudeIn, longitudeIn) VALUES(?,?,?,?,?,?)
        `,
        [id, startDateTime, employeeId, serviceId, latitudeIn, longitudeIn,]
    );
};

export default startShiftRecordService;
