import { v4 as uuid } from 'uuid';
 
import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const insertShiftService = async (serviceId, employeeId) => {

    const pool = await getPool();
    
    const [service] = await pool.query(
        `
        SELECT id FROM services WHERE id = ?
        `,[serviceId]
    );

    if(!service[0].id){
        generateErrorUtil('El servicio no existe', 401)
    };

    const [employee] = await pool.query(
        `
        SELECT id FROM users WHERE id = ? AND active = 1
        `,[employeeId]
    );

    if(!employee[0].id){
        generateErrorUtil('El empleado no existe o inactivo', 401)
    };

    await pool.query(
        `
        INSERT INTO shiftRecords(id, employeeId, serviceId) VALUES(?,?,?)
        `, [uuid(),employeeId,serviceId]
    );

    await pool.query(
        `
        UPDATE services SET status = 'accepted' WHERE id = ?
        `,[serviceId]
    );


}

export default insertShiftService;