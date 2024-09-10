import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;
        const { ubicacion, ahora } = req.body;

        await startShiftRecordService(shiftRecordId, ubicacion, ahora);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
