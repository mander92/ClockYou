import { v4 as uuid } from 'uuid';
import getPool from "../../db/getPool.js"

const insertTypeOfServiceService = async (type, description, city) => {
        const pool = await getPool();

        const id = uuid()
       
        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, city) VALUES (?,?,?,?)
            `,[id, type, description, city]
        )
}

export default insertTypeOfServiceService;