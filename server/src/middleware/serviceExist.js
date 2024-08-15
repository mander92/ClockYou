import generateErrorUtil from "../utils/generateErrorUtil.js"
import getPool from "../db/getPool.js";


const serviceExist = async (req, res, next) => {
    try {
        
        const { type, description, city }  = req.body;
       
        if(!type || !description || !city ){
            generateErrorUtil('Los campos no pueden estar vacios', 401);
        }
        
        const pool = await getPool();

        const [service] = await pool.query(
            `
            SELECT id FROM typeOfServices WHERE type = ? AND city = ?
            `,[type, city]
        );
        
        if(service.length){
            generateErrorUtil('El servicio ya esta creado', 401)
        }

        next()


    } catch (error) {
        next(error)
    }
}

export default serviceExist;