import getPool from '../../db/getPool.js';

const selectServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
        SELECT sr.clockIn, sr.clockOut, sr.latitude, sr.longitude, s.status, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime, a.address, a.postCode, a.city, s.comments, u.email, u.firstName, u.lastName , u.phone, u.dni, ue.firstName AS firstNameEmployee, ue.lastName AS lastNameEmployee,
        TIMESTAMPDIFF(HOUR, sr.clockIn, sr.clockOut) AS hoursWorked,
        MOD(TIMESTAMPDIFF(MINUTE, sr.clockIn, sr.clockOut), 60) AS minutesWorked
        FROM services s
        INNER JOIN addresses a
        ON a.id = s.addressId
        LEFT JOIN shiftRecords sr
        ON sr.serviceId = s.id
        INNER JOIN users u
        ON u.id = s.clientId
        LEFT JOIN users ue
        ON sr.employeeId = ue.id
        INNER JOIN typeOfServices t
        ON s.typeOfServicesId = t.id
        WHERE s.id = ? AND s.deletedAt IS NULL
        `,
        [serviceId]
    );

    return service[0];
};

export default selectServiceByIdService;
