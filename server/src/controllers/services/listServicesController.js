import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectServiceService from '../../services/services/selectServiceService.js';

const listServicesController = async (req, res, next) => {
    try {
        const isAdmin = req.userLogged.role;

        const { status } = req.query;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                409
            );
        }

        const services = await selectServiceService(status);

        if (!services.length) {
            generateErrorUtil('No se encuentran resultados', 401);
        }

        res.send({
            status: 'ok',
            data: {
                services,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listServicesController;
