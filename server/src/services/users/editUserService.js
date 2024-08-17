import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const editUserService = async (userId, email, userName, firstName, lastName, dni, phone, address, postCode, city) =>{

    const pool = await getPool();

    const [ userNameExist ] = pool.query(
        `
        SELECT id from users WHERE username = ?
        `,[userName]
    );

    if(userNameExist.length){
        generateErrorUtil('El nombre de usuario esta ocupado', 401)
    }

    const [ emailNameExist ] = pool.query(
        `
        SELECT id from users WHERE email = ?
        `,[email]
    );

    if(emailNameExist.length){
        generateErrorUtil('El correo esta ocupado', 401)
    }

    const [ user ] = await pool.query(
        `
        SELECT * FROM users WHERE id = ?
        `, [userId]
    );


    await pool.query(
        `
        UPDATE addresses SET address=?, city=?, postCode=? WHERE id=?
        `,[address, city, postCode, user[0].addressId]
    );

    await pool.query(
        `
        UPDATE users SET email=?, userName=?, firstName=?, lastName=?, dni=?, phone=? WHERE id=?
        `,[ email, userName, firstName, lastName, dni, phone, userId]
    );


}

export default editUserService;