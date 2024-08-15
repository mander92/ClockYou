import insertServiceService from "../../services/services/insertServiceService.js";

const createNewServiceController = async (req, res, next) =>{
    try {
        
        const {type, description, citys}  = req.body;

        await insertServiceService(type, description, citys);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido creado correctamente'
        })

    } catch (error) {
        next(error)
    }
}

export default createNewServiceController;