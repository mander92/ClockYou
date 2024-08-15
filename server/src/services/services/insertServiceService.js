import { v4 as uuid } from 'uuid';
import getPool from "../../db/getPool.js"

const insertServiceService = async (type, description, citys) => {
        const pool = await getPool();

        const id = uuid()
       
        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, citys) VALUES (?,?,?,?)
            `,[id, type, description, citys]
        )
}

export default insertServiceService;