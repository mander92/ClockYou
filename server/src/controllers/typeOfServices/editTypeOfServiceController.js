import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateTypeOfServiceService from '../../services/typeOfServices/updateTypeOfServiceService.js';

const editTypeOfServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            description: Joi.string().max(500),
            price: Joi.number(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { typeOfServiceId } = req.params;
        const { description, price } = req.body;

        const data = await updateTypeOfServiceService(
            typeOfServiceId,
            description,
            price
        );

        res.send({
            staus: 'ok',
            message: 'Servicio actualizado correctamente',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default editTypeOfServiceController;
