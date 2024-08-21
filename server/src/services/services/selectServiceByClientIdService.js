import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByClientIdService = async (clientId, status) => {
    const pool = await getPool();

    if (!status) {
        const [data] = await pool.query(
            `
                SELECT s.status AS Estado,
                t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio_Hora, s.hours AS Horas_Contratadas, s.totalPrice AS Precio_Total, s.date AS Fecha, s.startTime AS Hora_Inicio, 
                a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, s.comments AS Comenatarios, u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.phone AS Teléfono
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
            SELECT s.status AS Estado,
            t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio_Hora, s.hours AS Horas_Contratadas, s.totalPrice AS Precio_Total, s.date AS Fecha, s.startTime AS Hora_Inicio, 
            a.address AS Dirección, a.postCode AS CP, a.city AS Ciudad, s.comments AS Comenatarios, u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.phone AS Teléfono
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

    if (!data.length) {
        generateErrorUtil('No tienes servicios registrados');
    }

    return data;
};

export default selectServiceByClientIdService;
