import getPool from '../../db/getPool.js';

const selectShiftRecordByIdService = async (shiftRecordId) => {
    const pool = await getPool();

    const [shiftRecord] = await pool.query(
        `
        SELECT clockIn, clockOut FROM shiftRecords WHERE id = ?
        `,
        [shiftRecordId]
    );

    return shiftRecord[0];
};

export default selectShiftRecordByIdService;
