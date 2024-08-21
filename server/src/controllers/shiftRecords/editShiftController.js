import Joi from "joi";

import generateErrorUtil from "../../utils/generateErrorUtil.js";
import editShiftRecordsService from "../../services/shiftRecords/editShiftRecordsService.js";

const editShiftController = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      clockIn: Joi.string().required(),
      clockOut: Joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      generateErrorUtil("Faltan campos", 401);
    }

    const isAdmin = req.userLogged.role;

    if (isAdmin !== "admin") {
      generateErrorUtil("No tienes permisos suficientes", 401);
    }

    const { clockIn, clockOut } = req.body;

    const { id } = req.params;

    const data = await editShiftRecordsService(clockIn, clockOut, id);

    res.send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export default editShiftController;
