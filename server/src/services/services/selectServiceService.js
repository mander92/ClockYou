import getPool from '../../db/getPool.js';

const selectServiceService = async (status) => {
    const pool = await getPool();

    const [services] = await pool.query(
        `
            SELECT a.address, a.postCode, a.city, u.email, u.userName, u.firstName, u.lastName, u.dni, u.phone, u.active, s.id, s.startDate, s.endDate, s.startTime, s.endTime, s.description, s.numberOfEmployee, t.type, t.city, t.price
            FROM addresses a
            INNER JOIN users u
            ON a.id = u.addressId
            INNER JOIN services s
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE status = 'pending'
            `
    );

    return services;
};

export default selectServiceService;
