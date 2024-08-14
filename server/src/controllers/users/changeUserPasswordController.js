import updateUserPasswordService from "../../services/users/updateUserPasswordService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";


const changeUserPasswordController =  async (req, res, next) => {
    try {
        const {email, recoverPassCode, newPassword} = req.body;

        if (!email || !recoverPassCode || !newPassword) 
            throw generateErrorUtil('Faltan datos', 400);
      
          await updateUserPasswordService(email, recoverPassCode, newPassword);
      
          res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
          });
    } catch (error) {
        next(error)
    }


}

export default changeUserPasswordController;

