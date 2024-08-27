import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;

        const data = await startShiftRecordService(shiftRecordId);

        res.send({
            status: 'ok',
            message: 'Registrada la hora de inicio del servicio',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
