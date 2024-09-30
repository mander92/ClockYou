import selectShiftRecordsService from '../../services/shiftRecords/selectShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { typeOfService, employeeId } = req.query;

        const data = await selectShiftRecordsService(typeOfService, employeeId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
