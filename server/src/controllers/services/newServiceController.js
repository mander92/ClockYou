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

        const schema = Joi.object().keys({
            date: Joi.date().min('now').required(),
            startTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
                .required(),
            hours: Joi.number().min(1).max(8).required(),
            comments: Joi.string().max(500).optional(),
            address: Joi.string().max(255).required(),
            city: Joi.string().max(40).required(),
            postCode: Joi.string().length(5).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }
        const userId = req.userLogged.id;

        const { typeOfServiceId } = req.params;

        const { date, startTime, hours, comments, address, city, postCode } =
            req.body;

        const data = await insertServiceService(
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
            message:
                'Servicio solicitado correctamente. Recibirá la confirmación en su email',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default newServiceController;
