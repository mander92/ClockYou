import getPool from "../../db/getPool.js";

const selectServiceByType = async (type, city) => {

    const pool = await getPool();

    const [ service ] = await pool.query(
        `
        SELECT type, description, city FROM typeOfServices WHERE type = ? OR city = ?
        `, [type, city]
    );

    console.log(service)

    return service


}

export default selectServiceByType;