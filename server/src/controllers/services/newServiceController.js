import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';

const newServiceController = async (req, res, next) => {
    try {

        const schemaParams = Joi.object().keys({
            typeId: Joi.string().min(36)
        })

        const validationParams = schemaParams.validate(req.params);

        if(validationParams.error){
            generateErrorUtil(validationParams.error.message, 401);
        };

        const schemaBody = Joi.object().keys({
            startTime: Joi.string().max(5),
            endTime: Joi.string().max(5),
            startDate: Joi.date(),
            endDate: Joi.date(),
            description: Joi.string().max(500),
            address: Joi.string().max(255),
            city: Joi.string().max(40),
            postCode: Joi.string().min(5).max(5),
        });

        const validationBody = schemaBody.validate(req.params);

        if(validationBody.error){
            generateErrorUtil(validationBody.error.message, 401);
        };


        const { typeOfServiceId } = req.params;
        const {
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
            city,
            postCode,
        } = req.body;

        if (!startTime || !startDate || !address || !city || !postCode) {
            generateErrorUtil('Faltan campos', 401);
        }

        const [data] = await insertServiceService(
            typeOfServiceId,
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
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
