import Joi from 'joi';

import insertTypeOfServiceService from '../../services/typeOfServices/insertTypeOfServiceService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const newTypeOfServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            type: Joi.string().max(30),
            description: Joi.string().max(500),
            city: Joi.string().max(30),
            price: Joi.number().min(1),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { type, description, city, price } = req.body;

        await insertTypeOfServiceService(type, description, city, price);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default newTypeOfServiceController;
