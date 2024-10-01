import selectShiftRecordsService from '../../services/shiftRecords/selectShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { typeOfService, employeeId, startDate, endDate, generateExcel } =
            req.query;

        const data = await selectShiftRecordsService(
            typeOfService,
            employeeId,
            startDate,
            endDate,
            generateExcel
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
