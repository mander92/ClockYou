import getPool from "../../db/getPool.js"
import generateErrorUtil from "../../utils/generateErrorUtil.js"


const deleteTypeOfServiceService = async (id) => {

    const pool = await getPool()

    const [service] = await pool.query(
        `
        SELECT * FROM typeOfServices WHERE id = ?
        `, [id]
    )

    if(!service.length){
        generateErrorUtil('El Servicio que quieres borrar no existe en la base de datos', 401)
    }
    
    await pool.query(
        `
        DELETE FROM typeOfServices WHERE id = ?
        `, [id]
    )

}

export default deleteTypeOfServiceService;