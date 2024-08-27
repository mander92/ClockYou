import getPool from '../../db/getPool.js';

const endShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockOut = new Date();

    const [existingRecord] = await pool.query(
        `
            SELECT id FROM shiftRecords WHERE serviceId = ? AND employeeId = ? AND clockIn = ?
            `,
        [serviceId, employeeId, clockIn]
      );

      if (existingRecord.length === 0) {
        generateErrorUtil('El turno no está creado', 401);
      }  

    const [endedShift] = await pool.query(
    `
        INSERT INTO shiftRecords (serviceId,  employeeId, clockOut)
        VALUES (?, ?, ?);
    `, [serviceId ,employeeId, clockOut]
    );

    return endedShift;
}

export default endShiftRecordService;