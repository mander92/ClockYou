import insertTypeOfServiceService from "../../services/typeOfServices/insertTypeOfServiceService.js";

const newTypeOfServiceController = async (req, res, next) =>{
    try {
        
        const {type, description, city}  = req.body;

        await insertTypeOfServiceService(type, description, city);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido creado correctamente'
        })

    } catch (error) {
        next(error)
    }
}

export default newTypeOfServiceController;