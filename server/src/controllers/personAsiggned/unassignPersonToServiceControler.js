import generateErrorUtil from "../../utils/generateErrorUtil.js";
import deletePersonFormService from "../../services/personAssigned/deletePersonFormService.js";

const unassignPersonToServiceControler = async (req, res, next) => {
    try {
        const role = req.userLogged.role;
        const { serviceId, employeeId } = req.body;

        if (role !== 'admin') {
            generateErrorUtil('No tienes permiso para realizar esta acción')
        }

        if (!serviceId || !employeeId) {
            generateErrorUtil('Faltan datos para realizar esta operación')
        }

        const data = await deletePersonFormService(serviceId, employeeId)


        res.send({
            status: 'ok',
            data
        })

    } catch (error) {
        next(error)
    }
};

export default unassignPersonToServiceControler;