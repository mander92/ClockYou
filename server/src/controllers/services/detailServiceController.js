import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectServiceByIdService from '../../services/services/selectServiceByIdService.js';

const detailServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            serviceId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { serviceId } = req.params;

        const service = await selectServiceByIdService(serviceId);

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

export default detailServiceController;
