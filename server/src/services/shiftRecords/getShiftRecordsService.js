import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecordType, employeeId) => {
    const pool = await getPool();

    if (!shiftRecordType && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.rating,se.status, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
            TIMESTAMPDIFF(HOUR, s.clockIn, s.clockOut) AS hoursWorked,
            MOD(TIMESTAMPDIFF(MINUTE, s.clockIn, s.clockOut), 60) AS minutesWorked
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId
            ORDER BY se.createdAt DESC
            `
        );

        return shifts;
    }

    if (shiftRecordType && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.rating, se.status, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
            TIMESTAMPDIFF(HOUR, s.clockIn, s.clockOut) AS hoursWorked,
            MOD(TIMESTAMPDIFF(MINUTE, s.clockIn, s.clockOut), 60) AS minutesWorked
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE t.type = ? AND s.employeeId = ?
            ORDER BY se.createdAt DESC
            `,
            [shiftRecordType, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.rating, se.status, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
            TIMESTAMPDIFF(HOUR, s.clockIn, s.clockOut) AS hoursWorked,
            MOD(TIMESTAMPDIFF(MINUTE, s.clockIn, s.clockOut), 60) AS minutesWorked
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
            ORDER BY se.createdAt DESC
            `,
            [employeeId]
        );

        return shifts;
    }

    if (shiftRecordType) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.rating, se.status, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
            TIMESTAMPDIFF(HOUR, s.clockIn, s.clockOut) AS hoursWorked,
            MOD(TIMESTAMPDIFF(MINUTE, s.clockIn, s.clockOut), 60) AS minutesWorked            
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId 
            WHERE t.id = ? 
            ORDER BY se.createdAt DESC
            `,
            [shiftRecordType]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
