import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (
    location, startDateTime, employeeId, serviceId
) => {
    const latitudeIn = location[0];
    const longitudeIn = location[1];
    const pool = await getPool();
    const id = uuid();

    const [verify] = await pool.query(
        `
         SELECT id, clockIn FROM shiftrecords WHERE employeeId = ? AND serviceId = ?
            
        `, [employeeId, serviceId]
    );

    if (verify.length > 0) {
        generateErrorUtil("ya has fichado la entrada")
    }

    await pool.query(
        `
         INSERT INTO shiftrecords(id, clockIn, employeeId, serviceId, latitudeIn, longitudeIn) VALUES(?,?,?,?,?,?)
        `,
        [id, startDateTime, employeeId, serviceId, latitudeIn, longitudeIn,]
    );

    return id;

};

export default startShiftRecordService;
