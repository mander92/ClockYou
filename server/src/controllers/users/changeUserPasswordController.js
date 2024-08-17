import Joi from 'joi'

import updateUserPasswordService from "../../services/users/updateUserPasswordService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";


const changeUserPasswordController =  async (req, res, next) => {
    try {

      const schema = Joi.object().keys({
        email: Joi.string().email(),
        recoverPassCode: Joi.string().min(10),
        newPassword: Joi.string().min(6).max(50)
      });
  
      const validation = schema.validate(req.body);
  
      if(validation.error){
        console.log(validation.error.message)
        generateErrorUtil(validation.error.message, 401)
      }
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

