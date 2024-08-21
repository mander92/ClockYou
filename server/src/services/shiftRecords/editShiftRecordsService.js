import getPool from '../../db/getPool.js';

const editShiftRecordsService = async (clockIn, clockOut, shiftRecordId) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE shiftRecords SET clockIn = ?, clockOut = ? WHERE id = ?`,
        [clockIn, clockOut, shiftRecordId]
    );

    const [shift] = await pool.query(
        `SELECT * FROM shiftRecords WHERE id = ?`,
        [shiftRecordId]
    );

    return shift;
};

export default editShiftRecordsService;
