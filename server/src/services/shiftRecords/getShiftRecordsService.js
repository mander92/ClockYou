import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (shiftRecordId) => {
    const pool = await getPool();

    let sqlQuery = `
        SELECT 
            u.firstName, 
            u.lastName, 
            se.totalPrice, 
            a.city, 
            a.address, 
            t.type 
        FROM 
            shiftRecords s
        INNER JOIN 
            users u ON u.id = s.employeeId
        INNER JOIN 
            services se ON se.id = s.serviceId
        INNER JOIN 
            addresses a ON a.id = se.addressId
        INNER JOIN 
            typeOfServices t ON t.id = se.typeOfServicesId
    `;

    const [shift] = await pool.query(sqlQuery, sqlValues);
    return shift;
};

export default getShiftRecordsService;
