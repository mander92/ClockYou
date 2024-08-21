import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getShiftRecordsService from "../../services/shiftRecords/getShiftRecordsService.js";

const listShiftRecordsController = async (req,res,next) => {
    try {

        const user = req.userLogged.role;

        const { serviceId, employeeId } = req.query;
        

        if(user !== 'admin'){
            generateErrorUtil('No tienes permisos suficientes', 401)
        };

        const data = await getShiftRecordsService(serviceId, employeeId);

        res.send({
            status: 'ok',
            data: data
        })
        
    } catch (error) {
        next(error)
    }
}

export default listShiftRecordsController;