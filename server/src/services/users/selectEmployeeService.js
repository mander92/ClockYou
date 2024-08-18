import getPool from "../../db/getPool.js";

const selectEmployeeService = async (job, active, city) => {

    const pool = await getPool();

    if(!job || !active || !city){
        const [ allUsers ] = await pool.query(
            `
            SELECT id, firstName, lastName, job, addressId FROM users 
            `
        );

        return allUsers
    }

    const [ users ] = await pool.query(
        `
        SELECT id, firstName, lastName, job, addressId FROM users WHERE job = ? AND  active = ?
        `, [job]
    )

} 
export default selectEmployeeService;