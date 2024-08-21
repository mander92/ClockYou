import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByEmployeeIdService = async (employeeId, status) => {
    const pool = await getPool();

    if (!status) {
        const [data] = await pool.query(
            `
                SELECT s.status, t.type, t.city, s.date, s.startTime, s.hours, s.totalPrice,  a.address, a.city, a.postcode, s.comments
                FROM shiftRecords sr
                INNER JOIN services s
                ON sr.serviceId = s.id
                INNER JOIN addresses a
                ON s.addressId = a.id
                INNER JOIN typeOfServices t
                ON t.id = s.typeOfServicesId
            `,
            [employeeId]
        );

        if (!data.length) {
            generateErrorUtil('No tienes servicios asignados');
        }

        return data;
    }

    const [data] = await pool.query(
        `
            SELECT s.status AS Estado,  s.createdAt AS Creación, t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio, 
            s.hours AS Horas, s.totalPrice AS Precio_Total, s.date AS Fecha, a.city AS Ciudad, a.address AS Dirección, a.postCode AS CP, 
            s.totalPrice AS Precio_Total, u.firstName AS Nombre, u.lastName AS Apellidos, u.phone AS Teléfono, s.comments AS Comentarios
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE u.id = ? AND s.status = ? AND s.deletedAt IS NULL
        `,
        [employeeId, status]
    );

    if (!data.length) {
        generateErrorUtil('No tienes servicios asignados');
    }

    return data;
};

export default selectServiceByEmployeeIdService;
