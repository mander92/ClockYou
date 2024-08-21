import selectServiceByClientIdService from '../../services/services/selectServiceByClientIdService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const listClientServiceController = async (req, res, next) => {
    try {
        const clientId = req.userLogged.id;

        const isClient = req.userLogged.role;

        if (isClient !== 'client') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de cliente',
                409
            );
        }
        const { status } = req.query;

        const data = await selectServiceByClientIdService(clientId, status);

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

export default listClientServiceController;
