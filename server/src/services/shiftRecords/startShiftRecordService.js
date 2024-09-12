import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (shiftRecordId, location, entrada) => {
    const pool = await getPool();

    const datetime = new Date(entrada);

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
        UPDATE shiftRecords SET clockIn = ?, latitude = ?, longitude = ? WHERE id = ?
        `,
        [datetime, location.lat, location.lng, shiftRecordId]
    );
};

export default startShiftRecordService;
