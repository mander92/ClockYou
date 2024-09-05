import { genSalt } from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockIn = new Date();

    const [verify] = await pool.query(
        `
        SELECT clockIn FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    if (verify[0].clockIn !== null)
        generateErrorUtil('Ya has registrado una hora de inicio', 401);

    await pool.query(
        `
        UPDATE shiftRecords SET clockIn = ? WHERE id = ?
        `,
        [clockIn, shiftRecordId]
    );
};

export default startShiftRecordService;
