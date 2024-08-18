import selectTypeOfServiceById from '../../services/typeOfServices/selectTypeOfServiceById.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const detailTypeOfServicesController = async (req, res, next) => {
  try {
    const { typeOfServiceId } = req.params;

    if (!typeOfServiceId) {
      generateErrorUtil('El id del servicio es obligatorio', 401);
    }

    const service = await selectTypeOfServiceById(typeOfServiceId);

    res.send({
      status: 'ok',
      data: {
        service,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default detailTypeOfServicesController;
