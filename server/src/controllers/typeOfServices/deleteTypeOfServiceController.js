import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import deleteTypeOfServiceService from '../../services/typeOfServices/deleteTypeOfServiceService.js';

const deleteTypeOfServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            typeOfServiceId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { typeOfServiceId } = req.params;

        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                401
            );
        }

        await deleteTypeOfServiceService(typeOfServiceId);

        res.send({
            staus: 'ok',
            message: 'Servicio eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteTypeOfServiceController;
