import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';


const insertShiftRecordService = async (serviceId, employeeId) => {
    const pool = await getPool();

    const [created] = await pool.query(
        `
        SELECT serviceId FROM shiftRecords WHERE serviceId = ? 
        `,
        [serviceId]
    );

    if (created.length) generateErrorUtil('El turno ya está asignado', 401);

    const id = uuid();

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `,
        [id, employeeId, serviceId]
    );

};

export default insertShiftRecordService;
