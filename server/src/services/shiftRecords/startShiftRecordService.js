import getPool from '../../db/getPool.js';

const startShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockIn = new Date();

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
