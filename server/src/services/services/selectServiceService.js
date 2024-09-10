import getPool from '../../db/getPool.js';

const selectServiceService = async (status, order) => {
    const pool = await getPool();

    let sqlQuery = `
    SELECT s.status, s.id AS serviceId, t.id AS typeOfServiceId, 
    u.id AS clientId, a.id AS addressId, s.createdAt, 
    t.type, t.city AS province, t.price, 
    s.hours, s.totalPrice, s.dateTime, 
    a.city, a.address, a.postCode, 
    s.totalPrice, u.firstName, u.lastName, 
    u.phone, u.dni, u.email, s.comments
    FROM addresses a
    INNER JOIN services s
    ON a.id = s.addressId
    INNER JOIN users u
    ON u.id = s.clientId
    INNER JOIN typeOfServices t
    ON s.typeOfServicesId = t.id WHERE s.deletedAt IS NULL
    `;

    let sqlValues = [];

    if (status) {
        sqlQuery += ' AND status = ?';
        sqlValues.push(status);
    }

    if (order) {
        sqlQuery += ` ORDER BY s.dateTime ${order.toUpperCase()}`;
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};
export default selectServiceService;
