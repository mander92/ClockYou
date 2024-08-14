
import deleteService from '../../services/services/deleteService.js';
import selectServiceById from '../../services/services/selectServiceById.js';


import generateErrorUtil from '../../utils/generateErrorUtil.js';


const deleteServiceController = async (req, res, next) => {
    try {
        
        const { serviceId } = req.params;

        
        const service = await selectServiceById(serviceId);

        
        if (service.userId !== req.user.id) {
            generateErrorUtil('No tienes suficientes permisos', 401);
        }

        
        await deleteService(serviceId);

        res.send({
            status: 'ok',
            message: 'Servicio eliminado',
        });
    } catch (err) {
        
        next(err);
    }
};

export default deleteServiceController;
