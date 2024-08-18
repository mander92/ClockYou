import getPool from "../../db/getPool.js"


const getEmployeeByJob = async (job) => {

    const pool = getPool();

    const [ users ] = await pool.query(
        `
        SELECT id, firstName, lastName, job FROM users WHERE job = ? AND active = 1
        `,[job]
    );

    return users;
}

export default getEmployeeByJob;