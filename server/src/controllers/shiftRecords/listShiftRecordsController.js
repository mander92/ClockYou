import selectShiftRecordsService from '../../services/shiftRecords/selectShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { typeOfService, employeeId, startDate, endDate } = req.query;

        const data = await selectShiftRecordsService(
            typeOfService,
            employeeId,
            startDate,
            endDate
        );

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
