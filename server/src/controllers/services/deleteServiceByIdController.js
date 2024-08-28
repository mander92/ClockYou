import deleteServiceByIdService from '../../services/services/deleteServiceByIdService.js';

const deleteServiceByIdController = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        const userId = req.userLogged.id;

        await deleteServiceByIdService(userId, serviceId);

        res.send({
            status: 'ok',
            message: 'Servicio borrado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteServiceByIdController;
