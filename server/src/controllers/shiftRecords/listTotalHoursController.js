import generateErrorUtil from '../../utils/generateErrorUtil.js';
import listTotalHoursService from '../../services/shiftRecords/listTotalHoursService.js';

const listTotalHoursController = async (req, res, next) => {
    try {
        const { startDate, endDate, id } = req.query;

        if (!startDate || !endDate) {
            return generateErrorUtil(
                'Se requiere una fecha de inicio y una fecha de fin',
                400
            );
        }

        const data = await listTotalHoursService(startDate, endDate, id);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listTotalHoursController;
