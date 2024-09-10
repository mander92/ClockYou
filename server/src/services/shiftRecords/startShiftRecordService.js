import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (shiftRecordId, ubicacion, ahora) => {
    const pool = await getPool();

    const datetime = new Date(ahora);

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
        [datetime, ubicacion.lat, ubicacion.lng, shiftRecordId]
    );
};

export default startShiftRecordService;
