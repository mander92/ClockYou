import Joi from 'joi';

import selectTypeOfServiceByIdService from '../../services/typeOfServices/selectTypeOfServiceByIdService.js';

const detailTypeOfServicesController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const service = await selectTypeOfServiceByIdService(typeOfServiceId);

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

export default detailTypeOfServicesController;
