import generateErrorUtil from '../../utils/generateErrorUtil.js';
import newAssingPersonToServiceService from '../../services/personAssigned/newAssingPersonToServiceService.js';

const assingPersonToServiceController = async (req, res, next) => {
    try {
        const role = req.userLogged.role;
        const { employeeId } = req.body;
        const { serviceId } = req.params;

        if (role !== 'admin') {
            generateErrorUtil(
                'Solo un administrador tiene permisos para relizar esta operación',
                402
            );
        }

        const data = await newAssingPersonToServiceService(
            employeeId,
            serviceId
        );

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

export default assingPersonToServiceController;
