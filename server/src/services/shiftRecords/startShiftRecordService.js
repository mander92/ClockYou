import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordService = async (
    shiftRecordId,
    location,
    startDateTime
) => {
    const pool = await getPool();
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
        UPDATE shiftRecords SET clockIn = ?, latitudeIn = ?, longitudeIn = ? WHERE id = ?
        `,
        [
            startDateTime,
            location.currentLocation.lat,
            location.currentLocation.lng,
            shiftRecordId,
        ]
    );
};

export default startShiftRecordService;
