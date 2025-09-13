
import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordsController = async (req, res, next) => {
    try {

        const { location, clockIn, employeeId, serviceId } = req.body;

        // if (!location || !clockIn || employeeId || serviceId) {
        //     generateErrorUtil('Faltan campos obligatorios', 400);
        // }

        const startDateTime = new Date(clockIn);

        const data = await startShiftRecordService(location, startDateTime, employeeId, serviceId);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
            data: data
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
