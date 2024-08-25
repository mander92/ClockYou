import selectServiceService from '../../services/services/selectServiceService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listAdminServicesController = async (req, res, next) => {
    try {
        const { status } = req.query;

        const data = await selectServiceService(status);

        if (!data.length) {
            generateErrorUtil('No se encuentran resultados', 401);
        }

        res.send({
            status: 'ok',
            message: 'Lista de servicios',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listAdminServicesController;
