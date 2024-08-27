import generateErrorUtil from '../../utils/generateErrorUtil.js';
import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        if (!employeeId) {
            throw generateErrorUtil('Se requiere Id de empleado.', 400);
        }

        const data = await startShiftRecordService(employeeId);
        
        res.send({
            status: 'ok',
            message: 'El turno ha empezado ahora',
            data,
        });
            


    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;