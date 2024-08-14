import generateErrorUtil from "../utils/generateErrorUtil.js"
import getPool from "../db/getPool.js";


const serviceExist = async (req, res, next) => {
    try {
        
        const {  type, description, citys }  = req.body;
       
        if(!type || !description || !citys ){
            generateErrorUtil('El campo de Servicio no puede estar vacio o ciudad', 401);
        }
        
        const pool = await getPool();

        const [service] = await pool.query(
            `
            SELECT id FROM typeOfServices WHERE type = ?
            `,[type]
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