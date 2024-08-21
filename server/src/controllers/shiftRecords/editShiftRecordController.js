import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import editShiftRecordsService from '../../services/shiftRecords/editShiftRecordsService.js';

const editShiftRecordController = async (req, res, next) => {
    try {
        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                409
            );
        }

        const schema = Joi.object().keys({
            clockIn: Joi.date(),
            clockOut: Joi.date(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }
        const { clockIn, clockOut } = req.body;

        const { shiftRecordId } = req.params;

        const data = await editShiftRecordsService(
            clockIn,
            clockOut,
            shiftRecordId
        );

        res.send({
            status: 'ok',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default editShiftRecordController;
