import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
        SELECT s.status, t.type, t.city AS province, t.price, s.hours, s.totalPrice, s.dateTime, a.address, a.postCode, a.city, s.comments, u.email, u.firstName, u.lastName , u.phone
        FROM addresses a
        INNER JOIN services s
        ON a.id = s.addressId
        INNER JOIN users u
        ON u.id = s.clientId
        INNER JOIN typeOfServices t
        ON s.typeOfServicesId = t.id
        WHERE s.id = ? AND s.deletedAt IS NULL
        `,
        [serviceId]
    );

    if (!service.length)
        generateErrorUtil('No existen servicios asociados a ese ID', 404);

    return service[0];
};

export default selectServiceByIdService;
