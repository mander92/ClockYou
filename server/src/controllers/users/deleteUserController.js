import generateErrorUtil from "../../utils/generateErrorUtil.js";
import updateUserStateService from "../../services/users/updateUserStateService.js";

const deleteUserController = async (req, res, next) => {
  try {
    const isLogged = req.userLogged;

    if (!isLogged) {
      generateErrorUtil("No tienes permisos para realizar esta acción", 401);
    }

    const { userId } = req.params;

    if (!userId) {
      generateErrorUtil("No se ha encontrado el usuario", 404);
    }

    await updateUserStateService(userId);

    res.send({
      status: "ok",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUserController;
