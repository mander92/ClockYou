import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectServiceByEmployeeIdService = async (employeeId, status) => {
    const pool = await getPool();

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
        generateErrorUtil('No tienes servicios registrados');
    }

    return data;
};

export default selectServiceByEmployeeIdService;
