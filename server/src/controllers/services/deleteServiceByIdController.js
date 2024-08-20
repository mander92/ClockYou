import generateErrorUtil from '../../utils/generateErrorUtil.js';
import deleteServiceByIdService from '../../services/services/deleteServiceByIdService.js';

const deleteServiceByIdController = async (req, res, next) => {
  try {
    const isAdmin = req.userLogged.role;

    if (isAdmin !== 'admin') {
      generateErrorUtil(
        'Acceso denegado: Se requiere rol de Administrador',
        409
      );
    }

    const { serviceId } = req.params;

    await deleteServiceByIdService(serviceId);

    res.send({
      status: 'ok',
      message: 'Servicio borrado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteServiceByIdController;
