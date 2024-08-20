import getPool from "../../db/getPool.js"

const selectServiceByClientIdService = async (id) => {


    const pool = await getPool();
    

    const [ data ] = await pool.query(
        `
            SELECT s.id, t.city, t.description, t.price, t.type, s.status, s.hours, s.date, s.totalprice, a.address, a.postcode   
            FROM typeofservices t
            INNER JOIN
            services s
            ON t.id = s.typeofservicesId
            INNER JOIN 
            addresses a
            ON a.id = s.addressId
            WHERE clientId = ?;
        `,[id]
    )

    return data;

}

export default selectServiceByClientIdService;