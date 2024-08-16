import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateTypeOfServiceService from '../../services/typeOfServices/updateTypeOfServiceService.js';

const editTypeOfServiceController = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    const { type, city, description } = req.body;

    const isAdmin = req.userLogged.role;

    if (isAdmin !== 'admin') {
      generateErrorUtil('No tienes permisos de administrador', 401);
    }

    if (!type && !city && !description) {
      generateErrorUtil(
        'Debe haber contenido en al menos uno de los campos',
        401
      );
    }

    await updateTypeOfServiceService(typeId, type, city, description);

    res.send({
      staus: 'ok',
      message: 'Servicio actualizado correctamente',
    });
  } catch (error) {
    next(error);
  }
};

export default editTypeOfServiceController;
