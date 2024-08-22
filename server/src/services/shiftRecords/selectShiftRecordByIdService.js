import getPool from '../../db/getPool.js';

const selectShiftRecordByIdService = async (shiftRecordId) => {

    const pool = await getPool();

    const [ shiftRecord ] = await pool.query(
        `
        SELECT * FROM shiftRecords WHERE id = ?
        `,[shiftRecordId]
    );

    return shiftRecord;


}

export default selectShiftRecordByIdService;