import getPool from '../../db/getPool.js';

const selectServiceByClientIdService = async (clientId, status, city, type) => {
    const pool = await getPool();

    let sqlQuery = `
        SELECT s.id, s.rating, s.status, s.validationCode, s.comments, s.hours, s.totalPrice, s.dateTime, t.type, t.city AS province, t.price, a.address, a.postCode, a.city
        FROM addresses a
        INNER JOIN services s ON a.id = s.addressId
        INNER JOIN users u ON u.id = s.clientId
        INNER JOIN typeOfServices t ON s.typeOfServicesId = t.id
        WHERE u.id = ? AND s.deletedAt IS NULL
    `;

    let sqlValues = [clientId];

    if (status) {
        sqlQuery += ' AND s.status = ?';
        sqlValues.push(status);
    }

    if (city) {
        sqlQuery += ' AND a.city = ?';
        sqlValues.push(city);
    }

    if (type) {
        sqlQuery += ' AND t.type = ?';
        sqlValues.push(type);
    }

    sqlQuery += ' ORDER BY s.createdAt DESC';

    const [data] = await pool.query(sqlQuery, sqlValues);

    return data;
};

export default selectServiceByClientIdService;
