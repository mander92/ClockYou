import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByEmployeeIdService = async (employeeId) => {
    const pool = await getPool();

    const [data] = await pool.query(
        `
            SELECT s.status, t.type, t.city, s.date, s.startTime, s.hours, s.totalPrice, a.address, a.city, a.postcode, s.comments
            FROM shiftRecords sr
            INNER JOIN services s
            ON sr.serviceId = s.id
            INNER JOIN addresses a
            ON s.addressId = a.id
            INNER JOIN typeOfServices t
            ON t.id = s.typeOfServicesId
            WHERE sr.employeeId = ?
        `,
        [employeeId]
    );

    if (!data.length) {
        throw generateErrorUtil('No tienes servicios asignados');
    }

    return data;
};

export default selectServiceByEmployeeIdService;
