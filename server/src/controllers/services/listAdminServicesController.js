import selectServiceService from '../../services/services/selectServiceService.js';

const listAdminServicesController = async (req, res, next) => {
    try {
        const { status, order } = req.query;

        const data = await selectServiceService(status, order);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listAdminServicesController;
