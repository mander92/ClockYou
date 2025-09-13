import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const endShiftRecordService = async (
    shiftRecordId, location, startDateTime, serviceId
) => {
    const pool = await getPool();

    const [servicioId] = await pool.query(
        `
        SELECT serviceId FROM shiftRecords WHERE id = ? 
        `,
        [shiftRecordId]
    );

    if (!servicioId) {
        generateErrorUtil("No hay servicio asignado", 401);
    };


    const [clockIn] = await pool.query(
        `
          SELECT clockIn 
            FROM shiftRecords 
            WHERE id = ? 
            LIMIT 1
        `,
        [shiftRecordId]
    );

    console.log("aquii");
    console.log(clockIn);

    if (clockIn[0].clockIn === null) {
        generateErrorUtil("debe ficha la entrada primero", 401);
    };

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
        [startDateTime, location[0], location[1], shiftRecordId]
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
