import selectTypeOfServicesService from '../../services/typeOfServices/selectTypeOfServicesService.js';

const listTypeOfServicesController = async (req, res, next) => {
    try {
        const { type, city } = req.query;

        const service = await selectTypeOfServicesService(type, city);

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
