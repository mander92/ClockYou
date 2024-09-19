import getPool from '../../db/getPool.js';

const selectServiceByClientIdService = async (clientId, status, city, type) => {
    const pool = await getPool();

    if (!status && !city && !type) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, s.comments, s.hours, s.totalPrice, s.dateTime, t.type, t.city AS province, t.price, a.address, a.postCode, a.city
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.deletedAt IS NULL
            ORDER BY s.createdAt DESC
            `,
            [clientId]
        );
        return data;
    }

    if (status) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, s.comments, s.hours, s.totalPrice, s.dateTime, t.type, t.city AS province, t.price, a.address, a.postCode, a.city
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.status = ? AND s.deletedAt IS NULL
            ORDER BY s.createdAt DESC
            `,
            [clientId, status]
        );
        return data;
    }

    if (type) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, s.comments, s.hours, s.totalPrice, s.dateTime, t.type, t.city AS province, t.price, a.address, a.postCode, a.city
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND t.type = ? AND s.deletedAt IS NULL
            ORDER BY s.createdAt DESC
            `,
            [clientId, type]
        );
        return data;
    }

    if (city) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, s.comments, s.hours, s.totalPrice, s.dateTime, t.type, t.city AS province, t.price, a.address, a.postCode, a.city
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND a.city = ? AND s.deletedAt IS NULL
            ORDER BY s.createdAt DESC
            `,
            [clientId, city]
        );
        return data;
    }

    return data;
};

export default selectServiceByClientIdService;
