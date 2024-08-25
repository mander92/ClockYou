import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getShiftRecordsService from '../../services/shiftRecords/getShiftRecordsService.js';

const listShiftRecordsController = async (req, res, next) => {
    try {
        const { serviceId, employeeId } = req.query;

        const data = await getShiftRecordsService(serviceId, employeeId);

        if (!data.length) {
            generateErrorUtil('No existen datos', 409);
        }

        res.send({
            status: 'ok',
            message: 'Lista de registros horarios',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listShiftRecordsController;
