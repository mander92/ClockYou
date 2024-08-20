import getPool from '../../db/getPool.js';

const selectServiceService = async () => {
    const pool = await getPool();

    const [services] = await pool.query(
        `
            SELECT s.status AS Estado, s.createdAt AS Creación, 
            t.id AS typeOfServiceId, t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio, 
            a.id AS addressId , a.address AS Direccón, a.postCode AS CP, a.city AS Ciudad, 
            s.id AS serviceId, s.date AS Fecha, s.hours AS Horas, s.totalPrice AS Precio_Total, s.comments AS Descripción, 
            u.id AS userId, u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.dni AS DNI, u.phone AS Teléfono
            FROM addresses a
            INNER JOIN services s
            ON a.id = s.addressId
            INNER JOIN users u
            ON u.id = s.clientId
            INNER JOIN typeOfServices t
            ON s.typeOfServicesId = t.id
            WHERE status = 'pending'
            `
    );

    return services;
};

export default selectServiceService;
