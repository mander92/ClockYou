import { genSalt } from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockIn = new Date().toLocaleTimeString();

    const [verify] = await pool.query(
        `
        SELECT id FROM shiftRecords WHERE id = ? AND clockIn IS NOT NULL
        `,
        [shiftRecordId]
    );

    if (verify.length)
        generateErrorUtil('Ya has registrado una hora de inicio', 401);

    await pool.query(
        `
        UPDATE shiftRecords SET clockIn = ? WHERE id = ?
        `,
        [clockIn, shiftRecordId]
    );

    const [data] = await pool.query(
        `
        SELECT clockIn FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    return data[0];
};

export default startShiftRecordService;
