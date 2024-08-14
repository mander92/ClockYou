import generateErrorUtil from "../utils/generateErrorUtil.js"
import selectServiceByService from "../services/services/selectServiceByService,js";

const serviceExist = async (req, res, next) => {
    try {

        const [ service, city ] = req.body;

        if(!service || !city ){
            generateErrorUtil('El campo tipo de Servicio no puede estar vacio', 401);
        }

        await selectServiceByService(service);

        if(service){
            generateErrorUtil('El servicio que quieres crear ya existe', 401);
        }

        next()


    } catch (error) {
        next(error)
    }
}

export default serviceExist;