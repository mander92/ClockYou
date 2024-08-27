// import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateRatingServiceByIdService from '../../services/services/updateRatingServiceByIdService.js';
import Joi from 'joi';

const editRatingServiceByIdController = async (req, res, next) => {
  try {
    // const schema = Joi.object().keys({
    //   rating: Joi.number().min(1).max(8),
    // });

    // const validation = schema.validate(req.body);

    // if (validation.error) {
    //   generateErrorUtil(validation.error.message, 401);
    // }

    // Comprobar si el servicio está asociado al cliente comprobando la relación de ambos ids

    const { serviceId } = req.params;
    const { rating } = req.body;

    const data = await updateRatingServiceByIdService(serviceId, rating);

    res.send({
      status: 'ok',
      message: 'Servicio valorado correctamente',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export default editRatingServiceByIdController;
