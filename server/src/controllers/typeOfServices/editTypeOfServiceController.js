import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateTypeOfServiceService from '../../services/typeOfServices/updateTypeOfServiceService.js';

const editTypeOfServiceController = async (req, res, next) => {
    try {
        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                401
            );
        }

        const schemaBody = Joi.object().keys({
            description: Joi.string().max(500),
            price: Joi.number(),
        });

        const validationBody = schemaBody.validate(req.body);

        if (validationBody.error) {
            generateErrorUtil(validationBody.error.message, 401);
        }

        const { typeOfServiceId } = req.params;
        const { description, price } = req.body;

        await updateTypeOfServiceService(typeOfServiceId, description, price);

        res.send({
            staus: 'ok',
            message: 'Servicio actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editTypeOfServiceController;
