import getPool from "../../db/getPool.js";

const selectEmployeeService = async (job, active, city) => {

    const pool = await getPool();

    if(!job && !active && !city){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1
            `
        );

        return allUsers
    };

    if(job && active && city){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = ? AND job = ? AND city = ?
            `,[active,job,city]
        );

        return allUsers
    };

    if(job && city){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE job = ? AND city = ?
            `,[job,city]
        );

        return allUsers
    };

    if(job && active){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE job = ? AND active = ?
            `,[job,active]
        );

        return allUsers
    };

    if(city && active){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE city = ? AND active = ?
            `,[city,active]
        );

        return allUsers
    };


    if(!job && !city){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = ?
            `,[active]
        );

        return allUsers
    };

    if (!city && !active){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1 AND job = ?
            `,[job]
        );

        return allUsers
    };

    if (!job && !active){
        const [ allUsers ] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1 AND city = ?
            `,[city]
        );

        return allUsers
    };



} 
export default selectEmployeeService;