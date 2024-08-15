import getPool from "../../db/getPool.js";

const selectAllTypeOfServiceService = async () => {

    const pool = await getPool();

    const [services] = await pool.query(
        `
        SELECT type, description, city from typeOfServices;
        `
    );

    return services

}

export default selectAllTypeOfServiceService;