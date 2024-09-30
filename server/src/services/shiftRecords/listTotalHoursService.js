import getPool from '../../db/getPool.js';

const listTotalHoursService = async (startDate, endDate, id) => {
    const pool = await getPool();

    const [rows] = await pool.query(
        `SELECT 
            SUM(s.hours) AS totalHours, 
            u.id, 
            u.firstName, 
            u.lastName 
        FROM 
            shiftRecords sh
        INNER JOIN 
            users u ON sh.employeeId = u.id
        INNER JOIN 
            services s ON sh.serviceId = s.id
        INNER JOIN 
            typeOfServices t ON s.typeOfServicesId = t.id
        WHERE 
            s.dateTime BETWEEN ? AND ? 
            AND u.id = ?
        GROUP BY 
        u.id, u.firstName, u.lastName`,
        [startDate, endDate, id]
    );

    return rows;
};

export default listTotalHoursService;
