import getPool from '../../db/getPool.js';

const selectServiceByClientIdService = async (clientId, status) => {
    const pool = await getPool();

    if (!status) {
        const [data] = await pool.query(
            `
            SELECT s.status, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
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

    const [data] = await pool.query(
        `
            SELECT s.status, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime , a.address, a.postCode, a.city, s.comments, u.email, u.firstName,u.lastName, u.phone
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
};

export default selectServiceByClientIdService;
