import getPool from '../../db/getPool.js';

const selectServiceService = async (status) => {
    const pool = await getPool();

    const [services] = await pool.query(
        `
            SELECT a.*, u.*, s.*, t.*
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
