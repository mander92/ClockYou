import getPool from '../../db/getPool.js';

const selectServiceService = async () => {
    const pool = await getPool();

    const [services] = await pool.query(
        `
          SELECT s.status AS Estado, s.id AS serviceId, t.id AS typeOfServideId, 
          u.id AS userId, a.id AS addressId, s.createdAt AS Creación, 
          t.type AS Tipo_Servicio, t.city AS Provincia, t.price AS Precio, 
          s.hours AS Horas, s.totalPrice AS Precio_Total, s.date AS Fecha, 
          a.city AS Ciudad, a.address AS Dirección, a.postCode AS CP, 
          s.totalPrice AS Precio_Total, u.firstName AS Nombre, u.lastName AS Apellidos, 
          u.phone AS Teléfono, u.dni AS DNI, s.comments AS Comentarios
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
