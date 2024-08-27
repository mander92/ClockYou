import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import { deletePictureUtil, savePictureUtil } from '../../utils/photoUtil.js';
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const editUserAvatarController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        const user = await selectUserByIdService(userId);

        if (user.avatar) await deletePictureUtil(user.avatar);

        const avatarName = await savePictureUtil(req.files.avatar, 250);

        await updateUserAvatarService(avatarName, userId);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserAvatarController;
