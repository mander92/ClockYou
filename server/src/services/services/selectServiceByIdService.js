import getPool from '../../db/getPool.js';

const selectServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
            SELECT 
                us.firstName as clientName, 
                us.lastName AS clientLastName, 
                us.phone AS clientPhone, 
                us.email AS clientEmail, 
                sr.id, 
                sr.clockIn, 
                sr.clockOut, 
                sr.latitudeIn, 
                sr.longitudeIn, 
                s.status, 
                t.type, 
                t.city AS province, 
                t.price, 
                s.hours, 
                s.numberOfPeople,
                s.name, 
                s.totalPrice, 
                s.startDateTime, 
                a.address, 
                a.postCode, 
                a.city, 
                s.comments, 
                u.email, 
                u.id AS employeeId, 
                u.firstName, 
                u.lastName, 
                u.phone, 
                u.dni,
                TIMESTAMPDIFF(HOUR, sr.clockIn, sr.clockOut) AS hoursWorked,
                MOD(TIMESTAMPDIFF(MINUTE, sr.clockIn, sr.clockOut), 60) AS minutesWorked
            FROM services s
            INNER JOIN addresses a ON a.id = s.addressId
            LEFT JOIN shiftRecords sr ON sr.serviceId = s.id
            LEFT JOIN personsassigned pa ON s.id = pa.serviceId
            LEFT JOIN users u ON u.id = pa.employeeId
            LEFT JOIN users ue ON sr.employeeId = ue.id
            INNER JOIN typeOfServices t ON s.typeOfServicesId = t.id
            INNER JOIN users us ON us.id = s.clientId
            WHERE s.id = ? AND s.deletedAt IS NULL;
        `,
        [serviceId]
    );

    return service;
};

export default selectServiceByIdService;
