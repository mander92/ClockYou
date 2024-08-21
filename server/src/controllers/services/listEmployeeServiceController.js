import selectServiceByEmployeeIdService from '../../services/services/selectServiceByEmployeeIdService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listEmployeeServiceController = async (req, res, next) => {
    try {
        const employeeId = req.userLogged.id;

        const isEmployee = req.userLogged.role;

        if (isEmployee !== 'employee') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de empleado',
                409
            );
        }

        const {status} = req.query

        const data = await selectServiceByEmployeeIdService(employeeId, status);

        res.send({
            status: 'ok',
            data: {
                data,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listEmployeeServiceController;