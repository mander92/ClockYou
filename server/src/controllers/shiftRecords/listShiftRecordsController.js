import getShiftRecordsService from '../../services/shiftRecords/getShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId, employeeId } = req.query;

        const data = await getShiftRecordsService(shiftRecordId, employeeId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
