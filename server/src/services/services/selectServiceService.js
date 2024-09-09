import getPool from '../../db/getPool.js';

const selectServiceService = async (status, order) => {
    const pool = await getPool();

    let sqlQuery = `
    SELECT s.status AS Estado, s.id AS serviceId, t.id AS typeOfServiceId, 
    u.id AS clientId, a.id AS addressId, s.createdAt AS Creación, 
    t.type AS TipoServicio, t.city AS Provincia, t.price AS Precio, 
    s.hours AS Horas, s.totalPrice AS PrecioTotal, s.dateTime AS DíaYHora, 
    a.city AS Ciudad, a.address AS Dirección, a.postCode AS CP, 
    s.totalPrice AS PrecioTotal, u.firstName AS Nombre, u.lastName AS Apellidos, 
    u.phone AS Teléfono, u.dni AS DNI, s.comments AS Comentarios
    FROM addresses a
    INNER JOIN services s
    ON a.id = s.addressId
    INNER JOIN users u
    ON u.id = s.clientId
    INNER JOIN typeOfServices t
    ON s.typeOfServicesId = t.id WHERE s.deletedAt IS NULL
    `;

    let sqlValues = [];

    if (status) {
        sqlQuery += ' AND status = ?';
        sqlValues.push(status);
    }

    if (order) {
        sqlQuery += ` ORDER BY s.dateTime ${order.toUpperCase()}`;
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};
export default selectServiceService;
