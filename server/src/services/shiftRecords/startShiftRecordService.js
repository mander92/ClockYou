import getPool from '../../db/getPool.js';

const startShiftRecordService = async (shiftRecordId) => {
    const pool = await getPool();

    const clockIn = new Date();

    const [existingRecord] = await pool.query(
        `
            SELECT id FROM shiftRecords WHERE serviceId = ? AND employeeId = ?
            `,
        [serviceId, employeeId]
      );

      if (existingRecord.length === 0) {
        generateErrorUtil('El turno no está creado', 401);
      }  

    const [startedShift] = await pool.query(
    `
        INSERT INTO shiftRecords (serviceId,  employeeId, clockIn)
        VALUES (?, ?, ?);
    `, [serviceId ,employeeId, clockIn]
    );

    return startedShift;
}

export default startShiftRecordService;