import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateServiceByIdService from '../../services/services/updateServiceByIdService.js';


const editServiceController = async(req, res, next) => {
    try {
        // const loggedId = req.userLogged.id;

        // const { userId } = req.params;

        // if (loggedId !== userId) {
        //     generateErrorUtil('Acceso denegado, el token no coincide', 409);
        // }

        const { serviceId } = req.params;
        const { address, postCode, city, comments, date, hours } = req.body;
        
        const data = await updateServiceByIdService(serviceId, address, postCode, city, comments, date, hours)

        res.send({
            status: 'ok',
            message: 'Servicio borrado correctamente',
            data
        });

    } catch (error) {
        next(error);
    }
};

export default editServiceController;