import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (serviceId, employeeId) => {
    const pool = await getPool();

    if (!serviceId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * from shiftRecords;
            `
        );

        return shifts;
    }

    if (serviceId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * FROM shiftRecords WHERE serviceId = ? AND employeeId = ?
            `,
            [serviceId, employeeId]
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

    if (serviceId) {
        const [shifts] = await pool.query(
            `
            SELECT * FROM shiftRecords WHERE serviceId = ? 
            `,
            [serviceId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
