import selectTypeOfServicesService from '../../services/typeOfServices/selectTypeOfServicesService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listTypeOfServicesController = async (req, res, next) => {
    try {
        const { type, city } = req.query;

        const data = await selectTypeOfServicesService(type, city);

        if (!data.length)
            res.send({
                status: 'ok',
                message: data,
            });

        res.send({
            status: 'ok',
            message: 'Tipos de servicios',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listTypeOfServicesController;
