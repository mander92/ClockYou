import selectTypeOfServiceByIdService from '../../services/typeOfServices/selectTypeOfServiceByIdService.js';

const detailTypeOfServicesController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const data = await selectTypeOfServiceByIdService(typeOfServiceId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default detailTypeOfServicesController;
