import selectServiceByIdService from '../../services/services/selectServiceByIdService.js';

const detailServiceController = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        const service = await selectServiceByIdService(serviceId);

        res.send({
            status: 'ok',
            data: {
                service,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default detailServiceController;
