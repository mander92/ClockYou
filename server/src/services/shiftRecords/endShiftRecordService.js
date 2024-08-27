import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const endShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockOut = new Date().toLocaleTimeString();

    const [clockIn] = await pool.query(
        `
        SELECT id FROM shiftRecords WHERE id = ? AND clockIn IS NULL
        `,
        [shiftRecordId]
    );

    if (clockIn.length) {
        generateErrorUtil('No has registrado una hora de inicio', 401);
    }

    const [verify] = await pool.query(
        `
        SELECT id FROM shiftRecords WHERE id = ? AND clockOut IS NOT NULL
        `,
        [shiftRecordId]
    );

    if (verify.length) {
        generateErrorUtil('Ya has registrado una hora de fin', 401);
    }

    await pool.query(
        `
        UPDATE shiftRecords SET clockOut = ? WHERE id = ?
        `,
        [clockOut, shiftRecordId]
    );

    const [serviceId] = await pool.query(
        `
        SELECT serviceId FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    await pool.query(
        `
        UPDATE services SET status = 'completed' WHERE id = ?
        `,
        [serviceId[0].serviceId]
    );

    const [data] = await pool.query(
        `
        SELECT clockOut FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    return data[0];
};

export default endShiftRecordService;
