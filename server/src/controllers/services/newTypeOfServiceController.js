import insertTypeOfServiceService from "../../services/services/insertTypeOfServiceService.js";

const newTypeOfServiceController = async (req, res, next) =>{
    try {
        
        const {type, description, citys}  = req.body;

        await insertTypeOfServiceService(type, description, citys);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido creado correctamente'
        })

    } catch (error) {
        next(error)
    }
}

export default newTypeOfServiceController;