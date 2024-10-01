import selectShiftRecordsService from '../../services/shiftRecords/selectShiftRecordsService.js';
import path from 'path';
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

        if (generateExcel) {
            const filePath = data.excelFilePath;
            res.sendFile(path.resolve(filePath));
        } else {
            res.send({
                status: 'ok',
                data,
            });
        }
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
