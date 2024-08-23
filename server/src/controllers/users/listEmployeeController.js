import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectEmployeeService from '../../services/users/selectEmployeeService.js';

const listEmployeeController = async (req, res, next) => {
    try {
        const { job, active, city } = req.query;

        const users = await selectEmployeeService(job, active, city);

        if (!users.length) {
            generateErrorUtil(
                'No existen resultados con los filtros aplicados',
                401
            );
        }
        res.send({
            status: 'ok',
            users,
        });
    } catch (error) {
        next(error);
    }
};

export default listEmployeeController;
