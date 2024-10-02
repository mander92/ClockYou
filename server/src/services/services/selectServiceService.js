import getPool from '../../db/getPool.js';

const selectServiceService = async (status) => {
    const pool = await getPool();

    let sqlQuery = `
    SELECT s.id AS serviceId, s.status, t.type, t.city AS province, s.dateTime, a.city, a.address, a.postCode
    FROM addresses a
    INNER JOIN services s
    ON a.id = s.addressId
    INNER JOIN typeOfServices t
    ON s.typeOfServicesId = t.id WHERE s.deletedAt IS NULL
    `;

    let sqlValues = [];

    if (status) {
        sqlQuery += ' AND status = ?';
        sqlValues.push(status);
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};
export default selectServiceService;
