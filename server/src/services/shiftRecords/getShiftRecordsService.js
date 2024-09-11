import getPool from '../../db/getPool.js';

const getShiftRecordsService = async (serviceId, employeeId) => {
    const pool = await getPool();

    if (!serviceId && !employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT * from shiftRecords;
            `
        );

        return shifts;
    }

    if (serviceId && employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            u.firstName, u.LastName, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId;
            WHERE serviceId = ? AND employeeId = ?
            `,
            [serviceId, employeeId]
        );

        return shifts;
    }

    if (employeeId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            u.firstName, u.LastName, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId;
            WHERE employeeId = ?
            `,
            [employeeId]
        );

        return shifts;
    }

    if (serviceId) {
        const [shifts] = await pool.query(
            `
            SELECT 
            u.firstName, u.LastName, se.totalPrice, a.city, a.address, t.type 
            FROM shiftRecords s 
            INNER JOIN users u
            ON u.id = s.employeeId
            INNER JOIN services se
            ON se.id = s.serviceId
            INNER JOIN addresses a
            ON a.id = se.addressId
            INNER JOIN typeOfServices t
            ON t.id = se.typeOfServicesId;
            WHERE serviceId = ?  
            `,
            [serviceId]
        );

        return shifts;
    }
};

export default getShiftRecordsService;
