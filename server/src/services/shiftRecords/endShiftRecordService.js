import getPool from '../../db/getPool.js';

const endShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockOut = new Date();

    await pool.query(
        `
        UPDATE shiftRecords SET clockOut = ? WHERE id = ?
        `,
        [clockOut, shiftRecordId]
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
