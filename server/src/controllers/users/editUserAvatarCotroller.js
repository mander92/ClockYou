import selectUserByIdService from "../../services/users/selectUserByIdService.js";
import { deletePictureUtil, savePictureUtil } from "../../utils/photoUtil.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";

const editUserAvatarCotroller = async (req,res,next) => {
    try {
       
        const user = await selectUserByIdService(req.userLogged.id);
        
        //comprobar que no exosta un avatar, si existe elimino y asigno el nuevo
        if(user.avatar) await deletePictureUtil(user.avatar);

        const avatarName = await savePictureUtil(req.files.avatar,100);

        await updateUserAvatarService(avatarName, req.userLogged.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente'
        });

    } catch (error) {
        next(error);
    }
}

export default editUserAvatarCotroller;