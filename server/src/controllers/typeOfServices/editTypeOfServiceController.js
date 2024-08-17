import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateTypeOfServiceService from '../../services/typeOfServices/updateTypeOfServiceService.js';

const editTypeOfServiceController = async (req, res, next) => {
  try {

    const schemaBody = Joi.object().keys({
      type: Joi.string().max(30),
      description: Joi.string().max(500),
      city: Joi.string().max(30)
  });

  const validationBody = schemaBody.validate(req.body);

  if(validationBody.error){
      generateErrorUtil(validationBody.error.message, 401);
  };

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
