import deleteServiceByIdService from '../../services/services/deleteServiceByIdService.js';

const deleteServiceByIdController = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        await deleteServiceByIdService(serviceId);

        res.send({
            status: 'ok',
            message: 'Servicio borrado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteServiceByIdController;
