import selectTypeOfServicesService from '../../services/typeOfServices/selectTypeOfServicesService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listTypeOfServicesController = async (req, res, next) => {
    try {
        const { type, city } = req.query;

        const service = await selectTypeOfServicesService(type, city);

        if (!service.length) {
            generateErrorUtil(
                'No existen resultados con los filtros aplicados',
                401
            );
        }

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

export default listTypeOfServicesController;
