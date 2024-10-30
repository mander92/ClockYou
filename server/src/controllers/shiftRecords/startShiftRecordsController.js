
import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordsController = async (req, res, next) => {
    try {

        const { location, clockIn, employeeId, serviceId } = req.body;

        // if (!location || !clockIn || employeeId || serviceId) {
        //     generateErrorUtil('Faltan campos obligatorios', 400);
        // }

        const startDateTime = new Date(clockIn);

        await startShiftRecordService(location, startDateTime, employeeId, serviceId);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
