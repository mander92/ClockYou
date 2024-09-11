import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecordId, employeeId) => {
    const pool = await getPool();

    if (!shiftRecordId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, u.firstName, u.LastName  ,s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId
            `
        );

        return shifts;
    }

    if (shiftRecordId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, u.firstName, u.LastName, s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE shiftRecordId = ? AND employeeId = ?
            `,
            [shiftRecordId, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, u.firstName, u.LastName, s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE employeeId = ? 
            `,
            [employeeId]
        );

        return shifts;
    }

    if (shiftRecordId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, u.firstName, u.LastName, s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE shiftRecordId = ? 
            `,
            [shiftRecordId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
