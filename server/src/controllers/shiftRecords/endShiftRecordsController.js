import generateErrorUtil from '../../utils/generateErrorUtil.js';
import endShiftRecordService from '../../services/shiftRecords/endShiftRecordService.js';

const endShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.shiftRecords; 

        if (!shiftRecordId) {
            throw generateErrorUtil('No se encontró el registro del turno para cerrar.', 404);
        }

        
        const clockOut = new Date();

        const data = await endShiftRecordService(shiftRecordId, clockOut);
        
        res.send({
            status: 'ok',
            message: 'El turno ha terminado correctamente.',
            data,
        });
            


    } catch (error) {
        next(error);
    }
};

export default endShiftRecordsController;