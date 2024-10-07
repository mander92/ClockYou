import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateServiceByIdService from '../../services/services/updateServiceByIdService.js';
import Joi from 'joi';

const editServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            startDateTime: Joi.date().min('now').required(),
            hours: Joi.number().min(1).max(8).required(),
            comments: Joi.string().max(250).required(),
            address: Joi.string().max(255).required(),
            city: Joi.string().max(40).required(),
            postCode: Joi.string().length(5).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { serviceId } = req.params;

        const { address, postCode, city, comments, startDateTime, hours } =
            req.body;

        const data = await updateServiceByIdService(
            serviceId,
            address,
            postCode,
            city,
            comments,
            startDateTime,
            hours
        );

        res.send({
            status: 'ok',
            message: 'Servicio actualizado correctamente',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default editServiceController;
