import selectServiceByClientIdService from '../../services/services/selectServiceByClientIdService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listClientServiceController = async (req, res, next) => {
    try {
        const clientId = req.userLogged.id;

        const { status } = req.query;

        const data = await selectServiceByClientIdService(clientId, status);

        if (!data.length) {
            generateErrorUtil('No tienes servicios registrados');
        }

        res.send({
            status: 'ok',
            message: 'Lista de servicios',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listClientServiceController;
