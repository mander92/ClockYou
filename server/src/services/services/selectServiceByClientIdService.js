import getPool from '../../db/getPool.js';

const selectServiceByClientIdService = async (clientId, status, city, type) => {
    const pool = await getPool();

    if (!status && !city && !type) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.deletedAt IS NULL
            `,
            [clientId]
        );
        return data;
    }

    if (status) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.status = ? AND s.deletedAt IS NULL
            `,
            [clientId, status]
        );
        return data;
    }

    if (type) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND t.type = ? AND s.deletedAt IS NULL
            `,
            [clientId, type]
        );
        return data;
    }

    if (city) {
        const [data] = await pool.query(
            `
            SELECT s.id, s.rating, s.status, s.validationCode, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND a.city = ? AND s.deletedAt IS NULL
            `,
            [clientId, city]
        );
        return data;
    }

    return data;
};

export default selectServiceByClientIdService;
