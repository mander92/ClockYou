import selectServiceService from '../../services/services/selectServiceService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listAdminServicesController = async (req, res, next) => {
    try {
        const { status } = req.query;

        const services = await selectServiceService(status);

        if (!services.length) {
            generateErrorUtil('No se encuentran resultados', 401);
        }

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
