import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecordId, employeeId) => {
    const pool = await getPool();

    if (!shiftRecordId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
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
            `
        );

        return shifts;
    }

    if (shiftRecordId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
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
            WHERE s.id = ? AND s.employeeId = ?
            `,
            [shiftRecordId, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
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
            `,
            [employeeId]
        );

        return shifts;
    }

    if (shiftRecordId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            s.id, s.employeeId, u.firstName, u.lastName, s.clockIn, s.clockOut, se.hours, se.dateTime, a.city, a.address, t.type, t.city AS province,
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
            WHERE s.id = ? 
            `,
            [shiftRecordId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
