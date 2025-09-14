import endShiftRecordService from '../../services/shiftRecords/endShiftRecordService.js';

const endShiftRecordsController = async (req, res, next) => {
    try {

        const { serviceId, location, clockOut, employeeId } = req.body;
        const endDateTime = new Date(clockOut);

        await endShiftRecordService(employeeId, location, endDateTime, serviceId);

        res.send({
            status: 'ok',
            message: 'Hora de finalizacón registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default endShiftRecordsController;
