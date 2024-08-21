import selectServiceService from '../../services/services/selectServiceService.js';

const listAdminServicesController = async (req, res, next) => {
    try {
        const { status } = req.query;

        const services = await selectServiceService(status);

        res.send({
            status: 'ok',
            data: {
                services,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listAdminServicesController;
