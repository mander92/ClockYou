import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectEmployeeService from "../../services/users/selectEmployeeService.js";



const listEmployeeController = async (req,res,next) =>{
    try {
        
        const isAdmin = req.userLogged.role;

        if(isAdmin !== 'admin'){
            generateErrorUtil('Acceso denegado bitch', 401)
        };

        const { job, active, city } = req.query;

        const [ users ] = await selectEmployeeService(job,active, city);


    } catch (error) {
        next(error)
    }
}

export default listEmployeeController;