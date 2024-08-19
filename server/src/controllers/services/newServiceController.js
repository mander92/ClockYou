import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';

const newServiceController = async (req, res, next) => {
    try {
        const role = req.userLogged.role;

        if (role !== 'client') {
            generateErrorUtil('Acceso denegado');
        }

        const schemaParams = Joi.object().keys({
            typeOfServiceId: Joi.string().length(36),
        });

        const validationParams = schemaParams.validate(req.params);

        if (validationParams.error) {
            generateErrorUtil(validationParams.error.message, 401);
        }

        const schemaBody = Joi.object().keys({
            date: Joi.date().min('now'),
            hours: Joi.number().min(1).max(8),
            description: Joi.string().max(500),
            address: Joi.string().max(255),
            city: Joi.string().max(40),
            postCode: Joi.string().length(5),
        });

        const validationBody = schemaBody.validate(req.body);

        if (validationBody.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const clientId = req.userLogged.id;

        const { typeOfServiceId } = req.params;

        const {
            date,
            hours,
            description,
            address,
            numberOfEmployee,
            city,
            postCode,
        } = req.body;

        const [data] = await insertServiceService(
            clientId,
            typeOfServiceId,
            date,
            hours,
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
