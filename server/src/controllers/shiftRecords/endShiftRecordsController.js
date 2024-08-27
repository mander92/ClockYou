import endShiftRecordService from '../../services/shiftRecords/endShiftRecordService.js';

const endShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;

        const data = await endShiftRecordService(shiftRecordId);

        res.send({
            status: 'ok',
            message: 'Registrada la hora de fin del servicio',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default endShiftRecordsController;
