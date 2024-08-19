import getPool from '../../db/getPool.js';

const selectServiceService = async () => {
    const pool = await getPool();

    const [services] = await pool.query(
        `
            SELECT a.address, a.postCode, a.city, u.id, u.email, u.firstName, u.lastName, u.dni, u.phone, s.id, s.date, s.hours, s.description, t.type, t.city, t.price
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE status = 'pending'
            `
    );

    return services;
};

export default selectServiceService;
