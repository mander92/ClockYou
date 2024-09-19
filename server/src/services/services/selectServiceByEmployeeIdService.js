import getPool from '../../db/getPool.js';

const selectServiceByEmployeeIdService = async (employeeId) => {
    const pool = await getPool();

    const [data] = await pool.query(
        `
        SELECT sr.clockIn, sr.clockOut, sr.id, u.firstName, u.lastName, u.phone, t.city AS province, s.comments, s.dateTime, s.hours, s.status, s.rating, s.totalPrice, a.address, a.city, a.postCode,
        TIMESTAMPDIFF(HOUR, sr.clockIn, sr.clockOut) AS hoursWorked,
        MOD(TIMESTAMPDIFF(MINUTE, sr.clockIn, sr.clockOut), 60) AS minutesWorked
        FROM shiftRecords sr
        INNER JOIN services s
        ON sr.serviceId = s.id
        INNER JOIN addresses a
        ON s.addressId = a.id
        INNER JOIN users u
        ON u.id = s.clientId
        INNER JOIN typeOfServices t
        ON t.id = s.typeOfServicesId
        WHERE sr.employeeId = ?
        ORDER BY s.modifiedAt DESC
        `,
        [employeeId]
    );

    return data;
};

export default selectServiceByEmployeeIdService;
