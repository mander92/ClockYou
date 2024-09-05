import getPool from '../../db/getPool.js';

const editShiftRecordsService = async (clockIn, clockOut, shiftRecordId) => {
    const pool = await getPool();

    await pool.query(
        `
        UPDATE shiftRecords SET clockIn = ?, clockOut = ? WHERE id = ?
        `,
        [clockIn, clockOut, shiftRecordId]
    );
};

export default editShiftRecordsService;
