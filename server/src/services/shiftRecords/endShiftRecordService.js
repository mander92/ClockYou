import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const endShiftRecordService = async (
    shiftRecordId,
    location,
    startDateTime
) => {
    const pool = await getPool();

    const [serviceId] = await pool.query(
        `
        SELECT serviceId FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    const [clockIn] = await pool.query(
        `
        SELECT clockIn FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    if (clockIn[0].clockIn === null)
        generateErrorUtil('No has registrado una hora de inicio', 401);

    const [verify] = await pool.query(
        `
        SELECT clockOut FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    if (verify[0].clockOut !== null)
        generateErrorUtil('Ya has registrado una hora de fin', 401);

    await pool.query(
        `
        UPDATE shiftRecords SET clockOut = ?, latitudeOut = ?, longitudeOut = ? WHERE id = ?
        `,
        [
            startDateTime,
            location.currentLocation[0],
            location.currentLocation[1],
            shiftRecordId,
        ]
    );

    await pool.query(
        `
        UPDATE services SET status = 'completed' WHERE id = ?
        `,
        [serviceId[0].serviceId]
    );

    return;
};

export default endShiftRecordService;
