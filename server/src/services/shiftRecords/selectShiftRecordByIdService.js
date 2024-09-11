import getPool from '../../db/getPool.js';

const selectShiftRecordByIdService = async (shiftRecordId) => {
    const pool = await getPool();

    const [shiftRecord] = await pool.query(
        `
        SELECT 
        s.*, u.*, se.*, a.*, t.* 
        FROM shiftRecords s 
        INNER JOIN users u
        ON u.id = s.employeeId
        INNER JOIN services se
        ON se.id = s.serviceId
        INNER JOIN addresses a
        ON a.id = se.addressId
        INNER JOIN typeOfServices t
        ON t.id = se.typeOfServicesId
        WHERE s.id = ?
        `,
        [shiftRecordId]
    );

    return shiftRecord[0];
};

export default selectShiftRecordByIdService;
