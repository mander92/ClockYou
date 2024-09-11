import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecordId, employeeId) => {
    const pool = await getPool();

    if (!shiftRecordId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * from shiftRecords;
            `
        );

        return shifts;
    }

    if (shiftRecordId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * FROM shiftRecords WHERE shiftRecordId = ? AND employeeId = ?
            `,
            [shiftRecordId, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * FROM shiftRecords WHERE employeeId = ? 
            `,
            [employeeId]
        );

        return shifts;
    }

    if (shiftRecordId) {
        const [shifts] = await pool.query(
            `
            SELECT * FROM shiftRecords WHERE shiftRecordId = ? 
            `,
            [shiftRecordId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
