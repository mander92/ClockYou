import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateServiceByIdService from '../../services/services/updateServiceByIdService.js';

const editServiceController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId) {
            generateErrorUtil('Acceso denegado, el token no coincide', 409);
        }

        const schema = Joi.object().keys({
            date: Joi.date().min('now'),
            startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
            hours: Joi.number().min(1).max(8),
            comments: Joi.string().max(500),
            address: Joi.string().max(255),
            city: Joi.string().max(40),
            postCode: Joi.string().length(5),
        });

        const validation = schema.validate(req.body);

        if (validatio.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { serviceId } = req.params;
        const { address, postCode, city, comments, date, hours, startTime } =
            req.body;

        const data = await updateServiceByIdService(
            serviceId,
            address,
            postCode,
            city,
            comments,
            date,
            hours,
            startTime
        );

        res.send({
            status: 'ok',
            message: 'Servicio borrado correctamente',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default editServiceController;
