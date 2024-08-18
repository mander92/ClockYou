import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';

const newServiceController = async (req, res, next) => {
    try {
        const schemaParams = Joi.object().keys({
            typeOfServiceId: Joi.string().length(36),
        });

        const validationParams = schemaParams.validate(req.params);

        if (validationParams.error) {
            generateErrorUtil(validationParams.error.message, 401);
        }

        const schemaBody = Joi.object().keys({
            startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
            endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
            startDate: Joi.date().min('now'),
            endDate: Joi.date(),
            description: Joi.string().max(500),
            address: Joi.string().max(255),
            city: Joi.string().max(40),
            postCode: Joi.string().length(5),
            numberOfEmployee: Joi.number().min(1).max(99),
        });

        const validationBody = schemaBody.validate(req.body);

        if (validationBody.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const { typeOfServiceId } = req.params;
        const {
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
            numberOfEmployee,
            city,
            postCode,
        } = req.body;

        const [data] = await insertServiceService(
            typeOfServiceId,
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
            numberOfEmployee,
            city,
            postCode
        );

        res.send({
            status: 'ok',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default newServiceController;
