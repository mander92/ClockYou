import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectServiceByStatusService from "../../services/services/selectServiceByStatusService.js";



const listAllServicesController = async (req, res, next) => {
    try {
        
        const { status } = req.query;
        const { clientId } = req.params;

        if(!clientId){
            generateErrorUtil('No exite la ruta')
        }
        
            const services = await selectServiceByStatusService(clientId,status);
            return services
        
        

        if(!services.length){
            generateErrorUtil('No se encuentran resultados', 401)
        }

        res.send({
            status: 'ok',
            data: {
                services
            }
        })

    } catch (error) {
        next(error)
    }
}

export default listAllServicesController;