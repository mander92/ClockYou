import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [service] = await pool.query(
        `
            SELECT s.status AS Estado, s.createdAt AS Creación,
            t.type AS Tipo_Servico, t.city AS Provincia, t.price AS Precio, 
            a.address AS Direccón, a.postCode AS CP, a.city AS Ciudad, 
            s.date AS Fecha, s.hours AS Horas, s.totalPrice AS Total, s.comments AS Descripción, 
            u.email AS Email, u.firstName AS Nombre, u.lastName AS Apellidos, u.dni AS DNI, u.phone AS Teléfono
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

    if (!service.length) {
        generateErrorUtil('No existen servicios asociados a ese ID', 404);
    }

    return service;
};

export default selectServiceByIdService;
