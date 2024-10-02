import selectServiceService from '../../services/services/selectServiceService.js';

const listAdminServicesController = async (req, res, next) => {
    try {
        const { status, type } = req.query;

        const data = await selectServiceService(status, type);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listAdminServicesController;
