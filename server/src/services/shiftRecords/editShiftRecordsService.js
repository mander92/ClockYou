import getPool from "../../db/getPool.js";

const editShiftRecordsService = async (clockIn, clockOut, id) => {
  const pool = await getPool();

  await pool.query(
    `UPDATE shiftRecords SET clockIn = ?, clockOut = ? WHERE id = ?`,
    [clockIn, clockOut]
  );

  const [shift] = await pool.query(`SELECT * FROM shiftRecords WHERE id = ?`, [
    id,
  ]);
  return shift;
};

export default editShiftRecordsService;
