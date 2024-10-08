import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;
        const { location, clockIn } = req.body;
        console.log(location);
        if (!location || !clockIn) {
            generateErrorUtil('Faltan campos obligatorios', 400);
        }

        const startDateTime = new Date(clockIn);

        await startShiftRecordService(shiftRecordId, location, startDateTime);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
