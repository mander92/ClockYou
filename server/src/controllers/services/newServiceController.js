import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';
import insertServiceAdmin from '../../services/services/inserServiceAdmin.js';

const newServiceController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            startDateTime: Joi.date().min('now').required(),
            endDateTime: Joi.date().min('now').required(),
            hours: Joi.number().min(1).max(8).required(),
            numberOfPeople: Joi.number().min(1).max(8).required(),
            comments: Joi.string().max(250).required(),
            address: Joi.string().max(255).required(),
            city: Joi.string().max(40).required(),
            postCode: Joi.string().length(5).required(),
            clientId: Joi.string(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const userId = req.userLogged.id;
        const role = req.userLogged.role;

        if (role === 'admin') {
            const { typeOfServiceId } = req.params;
            const {
                startDateTime,
                endDateTime,
                hours,
                numberOfPeople,
                comments,
                address,
                city,
                postCode,
                clientId,
            } = req.body;

            const data = await insertServiceAdmin(
                typeOfServiceId,
                startDateTime,
                endDateTime,
                hours,
                numberOfPeople,
                comments,
                address,
                city,
                postCode,
                clientId
            );
            res.send({
                status: 'ok',
                message:
                    'Servicio creado correctamente, ahora hay que asignar empleado/s al servicio',
                data,
            });
        } else {
            const { typeOfServiceId } = req.params;

            const {
                startDateTime,
                hours,
                numberOfPeople,
                comments,
                address,
                city,
                postCode,
            } = req.body;

            const data = await insertServiceService(
                typeOfServiceId,
                userId,
                startDateTime,
                hours,
                numberOfPeople,
                comments,
                address,
                city,
                postCode
            );
            res.send({
                status: 'ok',
                message:
                    'Servicio solicitado correctamente, en cuanto asignemos un empleado recibirá la información en su Correo Eléctronico',
                data,
            });
        }
    } catch (error) {
        next(error);
    }
};

export default newServiceController;
