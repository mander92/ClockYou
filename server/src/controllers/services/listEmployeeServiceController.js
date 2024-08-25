import selectServiceByEmployeeIdService from '../../services/services/selectServiceByEmployeeIdService.js';

const listEmployeeServiceController = async (req, res, next) => {
    try {
        const employeeId = req.userLogged.id;

        const data = await selectServiceByEmployeeIdService(employeeId);

        res.send({
            status: 'ok',
            message: 'Lista de servicios confirmados',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listEmployeeServiceController;
