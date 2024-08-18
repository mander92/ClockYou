import getPool from "../../db/getPool.js";


const selectServiceByStatusService = async (clientId, status) => {

    const pool = await getPool()

    if(!status && !clientId){
        const [ services ] = await pool.query(
            `
            SELECT * FROM services;
            `
        );

        return services
    };

    if(!clientId && status){
        const [ services ] = await pool.query(
            `
            SELECT * FROM services WHERE status = ?
            `,[status]
        );
        return services
    }

    if(clientId && status){
        const [ services ] = await pool.query(
            `
            SELECT u.id, s.* FROM users u
            INNER JOIN
            services s
            ON u.id = s.clientId
            WHERE id = ? AND status = ?
            `,[clientId, status]
        );
        return services
    }

    return services

}

export default selectServiceByStatusService;