import Joi from 'joi';

import selectTypeOfServiceByIdService from '../../services/typeOfServices/selectTypeOfServiceByIdService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const detailTypeOfServicesController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const schema = Joi.object().keys({
            typeOfServiceId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

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
