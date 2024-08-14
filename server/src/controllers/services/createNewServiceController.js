import createNewServiceService from "../../services/services/insertServiceService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js"

const createNewServiceController = async (req, res, next) =>{
    try {
        
        const {type, description, citys}  = req.body;

        if( !type || !description || !citys ){
            generateErrorUtil('Los campos del formularios deben estar rellenos', 401)
        }

        await createNewServiceService(type, description, citys);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido creado correctamente'
        })

    } catch (error) {
        next(error)
    }
}

export default createNewServiceController;