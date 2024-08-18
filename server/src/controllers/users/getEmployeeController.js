import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectEmployeeByUserId from "../../services/users/selectEmployeeByUserId.js";

const getEmployeeController = async (req, res, next) => {
  try {
    const isAdmin = req.userLogged.role;
    const { employeeId } = req.params;

    if (isAdmin !== "admin") {
      generateErrorUtil(
        "Acceso denegado: Se requiere rol de Administrador",
        401
      );
    }

    const employee = await selectEmployeeByUserId(employeeId);

    res.send({
      status: "ok",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

export default getEmployeeController;
