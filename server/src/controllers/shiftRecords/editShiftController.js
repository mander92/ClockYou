import generateErrorUtil from "../../utils/generateErrorUtil.js";
import editShiftRecordsService from "../../services/shiftRecords/editShiftRecordsService.js";

const editShiftController = async (req, res, next) => {
  try {
    const isAdmin = req.userLogged.role;

    if (isAdmin !== "admin") {
      generateErrorUtil("No tienes permisos suficientes", 401);
    }

    const { clockIn, clockOut } = req.body;

    const { id } = req.params;

    if (!clockIn || !clockOut) {
      generateErrorUtil("Faltan campos", 401);
    }

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
