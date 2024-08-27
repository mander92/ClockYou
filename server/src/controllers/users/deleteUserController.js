import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserStateService from '../../services/users/updateUserStateService.js';

const deleteUserController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        await updateUserStateService(userId);

        res.send({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteUserController;
