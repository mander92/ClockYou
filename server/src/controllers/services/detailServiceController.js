import selectServiceByIdService from '../../services/services/selectServiceByIdService.js';

const detailServiceController = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        const data = await selectServiceByIdService(serviceId);

        res.send({
            status: 'ok',
            message: 'Detalles del servicio',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default detailServiceController;
