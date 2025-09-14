import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (
    location, startDateTime, employeeId, serviceId
) => {

    const [latitudeIn, longitudeIn] = location;
    const pool = await getPool();
    const id = uuid();

    // Verificar si ya hay un turno abierto
    const [rows] = await pool.query(
        `
    SELECT id
    FROM shiftrecords
    WHERE employeeId = ? AND serviceId = ? AND clockOut IS NULL
    `,
        [employeeId, serviceId]
    );

    if (rows.length > 0) {
        generateErrorUtil("Ya has fichado la entrada", 401);
    }

    // Insertar nuevo turno
    await pool.query(
        `
    INSERT INTO shiftrecords (id, clockIn, employeeId, serviceId, latitudeIn, longitudeIn)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
        [id, startDateTime, employeeId, serviceId, latitudeIn, longitudeIn]
    );

    return id;

};

export default startShiftRecordService;
