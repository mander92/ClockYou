import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getEmployeeByJob from "../../services/serviceAssigned/getEmployeeByJob.js";


const newServiceAssignedController = async (req,res,next) =>{
    try {

        const { job } = req.body;

        /* Necesitamos filtrar ID del usuario por profesion y activo en la BD */

        const [ users ] = await getEmployeeByJob(job);

        if(!userId){
            generateErrorUtil('No existe empleado con esas caracteristicas', 401);
        };

        // Filtrar el ID del Servicio por Status pending

        //Cambiar el estado pending del servicio a accepted

        //insertar las claves foranes en la tabla

        res.send({
            satus: 'ok',
            data: users
        })
        
    } catch (error) {
        next(error)
    }
}

export default newServiceAssignedController;