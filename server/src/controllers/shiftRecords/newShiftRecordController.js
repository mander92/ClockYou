import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertShiftRecordService from '../../services/shiftRecords/insertShiftRecordService.js';

const newShiftRecordController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            employeeId: Joi.string().length(36),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const { serviceId } = req.params;

        const { employeeId, clientId } = req.body;

        await insertShiftRecordService(serviceId, employeeId, clientId);

        res.send({
            status: 'ok',
            message: 'Se ha creado el turno correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default newShiftRecordController;
