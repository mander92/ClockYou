import selectTypeOfServicesService from '../../services/typeOfServices/selectTypeOfServicesService.js';

const listTypeOfServicesController = async (req, res, next) => {
    try {
        const { type, city } = req.query;

        const data = await selectTypeOfServicesService(type, city);

        if (!data.length)
            return res.send({
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
