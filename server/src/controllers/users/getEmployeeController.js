import selectEmployeeByUserId from '../../services/users/selectEmployeeByUserIdService.js';

const getEmployeeController = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        const employee = await selectEmployeeByUserId(employeeId);

        res.send({
            status: 'ok',
            employee,
        });
    } catch (error) {
        next(error);
    }
};

export default getEmployeeController;
