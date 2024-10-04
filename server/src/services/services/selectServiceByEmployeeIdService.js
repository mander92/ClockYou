import getPool from '../../db/getPool.js';

const selectServiceByEmployeeIdService = async (status, type, employeeId) => {
    const pool = await getPool();

    let sqlQuery = `
        SELECT sr.serviceId, sr.clockIn, sr.clockOut, sr.id, s.status, u.firstName, u.lastName, u.phone, t.type, t.city AS province, s.comments, s.startDateTime, s.hours, s.status, s.rating, s.totalPrice, a.address, a.city, a.postCode,
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
         
        `;

    let sqlValues = [employeeId];

    if (status) {
        sqlQuery += ' AND s.status = ?';
        sqlValues.push(status);
    }

    if (type) {
        sqlQuery += ' AND t.type = ?';
        sqlValues.push(type);
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};

export default selectServiceByEmployeeIdService;
