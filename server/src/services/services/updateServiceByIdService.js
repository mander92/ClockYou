import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateServiceByIdService = async (
    serviceId,
    address,
    postCode,
    city,
    comments,
    date,
    hours,
    startTime
) => {
    const pool = await getPool();

    const [status] = await pool.query(
        `
        SELECT id FROM services WHERE id = ? AND status != 'pending'
        `,
        [serviceId]
    );

    if (status.length) {
        generateErrorUtil('El servicio ya no se puede modificar', 409);
    }

    const [addressId] = await pool.query(
        `
        SELECT addressId FROM services WHERE id = ?
        `,
        [serviceId]
    );

    await pool.query(
        `
        UPDATE addresses SET address = ?, postCode = ?, city = ?
        WHERE id = ?
        `,
        [address, postCode, city, addressId[0].addressId]
    );

    const [typeId] = await pool.query(
        `
        SELECT typeOfServicesId FROM services WHERE id = ?
        `,
        [serviceId]
    );

    const [price] = await pool.query(
        `
        SELECT price FROM typeOfServices WHERE id = ?
        `,
        [typeId[0].typeOfServicesId]
    );

    const resultPrice = price[0].price * hours;

    await pool.query(
        `
        UPDATE services SET comments = ?, date = ?, hours = ?, startTime = ?, totalPrice = ?
        WHERE id = ?
        `,
        [comments, date, hours, startTime, resultPrice, serviceId]
    );

    const [data] = await pool.query(
        `
        SELECT s.date, s.startTime, s.hours, s.totalPrice, a.address, a.city, a.postCode
        FROM services s
        INNER JOIN addresses a
        ON a.id = s.addressId
        WHERE s.id = ?
        `,
        [serviceId]
    );

    return data[0];
};

export default updateServiceByIdService;
