import endShiftRecordService from '../../services/shiftRecords/endShiftRecordService.js';

const endShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;
        const { clockOut } = req.body;
        const startDateTime = new Date(clockOut);

        await endShiftRecordService(shiftRecordId, startDateTime);

        res.send({
            status: 'ok',
            message: 'Hora de finalizacón registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default endShiftRecordsController;
