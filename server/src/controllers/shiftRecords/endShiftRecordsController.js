import endShiftRecordService from '../../services/shiftRecords/endShiftRecordService.js';

const endShiftRecordsController = async (req, res, next) => {
    try {

        const { shiftRecordId } = req.params;
        const { serviceId,
            location,
            clockOut, } = req.body;
        const startDateTime = new Date(clockOut);

        await endShiftRecordService(shiftRecordId, location, startDateTime, serviceId);

        res.send({
            status: 'ok',
            message: 'Hora de finalizacón registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default endShiftRecordsController;
