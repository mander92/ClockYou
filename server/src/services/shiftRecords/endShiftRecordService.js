import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const endShiftRecordService = async (
    employeeId, location, endDateTime, serviceId
) => {
    const pool = await getPool();
    const [latitudeOut, longitudeOut] = location;

    // 1) Buscar el turno abierto (clockOut IS NULL)
    const [rows] = await pool.query(
        `
      SELECT id
      FROM shiftrecords
      WHERE employeeId = ? AND serviceId = ? AND clockOut IS NULL
      LIMIT 1
    `,
        [employeeId, serviceId]
    );

    if (rows.length === 0) {
        // No hay turno abierto para cerrar
        generateErrorUtil('Debes fichar la entrada primero', 401);
        return; // por si generateErrorUtil no hace throw
    }

    const shiftId = rows[0].id;

    // 2) Cerrar el turno. La condición "AND clockOut IS NULL" evita carreras:
    const [result] = await pool.query(
        `
      UPDATE shiftrecords
      SET clockOut = ?, latitudeOut = ?, longitudeOut = ?
      WHERE id = ? AND clockOut IS NULL
    `,
        [endDateTime, latitudeOut, longitudeOut, shiftId]
    );

    if (result.affectedRows === 0) {
        // Si nadie fue actualizado, es que ya estaba cerrado
        generateErrorUtil('Ya has registrado una hora de fin', 401);
        return;
    }

    // 3) Marcar el servicio como completado (si aplica a tu lógica de negocio)
    await pool.query(
        `
      UPDATE services
      SET status = 'completed'
      WHERE id = ?
    `,
        [serviceId]
    );

    return;

};

export default endShiftRecordService;
