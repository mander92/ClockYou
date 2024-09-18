import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecorId, employeeId) => {
    const pool = await getPool();

    if (!shiftRecorId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.LastName  ,s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
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

    if (shiftRecorId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.LastName  ,s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE s.id = ? AND s.employeeId = ?
            `,
            [shiftRecorId, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.LastName  ,s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE s.employeeId = ? 
            `,
            [employeeId]
        );

        return shifts;
    }

    if (shiftRecorId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.LastName  ,s.clockIn, s.clockOut, se.totalPrice, a.city, a.address, t.type  
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE s.id = ? 
            `,
            [shiftRecorId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
