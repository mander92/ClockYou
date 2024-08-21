import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';

const newServiceController = async (req, res, next) => {
    try {
        const isClient = req.userLogged.role;

        if (isClient !== 'client') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de cliente',
                409
            );
        }

        const schemaBody = Joi.object().keys({
            date: Joi.date().min('now'),
            startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
            hours: Joi.number().min(1).max(8),
            comments: Joi.string().max(500),
            address: Joi.string().max(255),
            city: Joi.string().max(40),
            postCode: Joi.string().length(5),
        });

        const validationBody = schemaBody.validate(req.body);

        if (validationBody.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }
        const userId = req.userLogged.id;

        const { typeOfServiceId } = req.params;

        const { date, startTime, hours, comments, address, city, postCode } =
            req.body;

        const [data] = await insertServiceService(
            typeOfServiceId,
            userId,
            date,
            startTime,
            hours,
            comments,
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
