import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getShiftRecordsService from '../../services/shiftRecords/getShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecorId, employeeId } = req.query;

        const data = await getShiftRecordsService(shiftRecorId, employeeId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
