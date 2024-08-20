import selectServiceByClientIdService from "../../services/services/selectServiceByClientIdService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const listClientServiceController = async (req,res,next) => {
    try {
        
        const id = req.userLogged.id;

        if(req.userLogged.role !== 'client'){
            generateErrorUtil('No tienes permisos suficientes', 401)
        }
        

        const data = await selectServiceByClientIdService(id)

        res.send({
            status: 'ok',
            data: {
                data
            }
        })


    } catch (error) {
        next(error)
    }
}

export default listClientServiceController;