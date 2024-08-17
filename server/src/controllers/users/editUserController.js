import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import editUserService from '../../services/users/editUserService.js';


const editUserController = async (req,res,next) =>{
    try {

        const schema = Joi.object().keys({
            userId: Joi.string().min(36)
        });

        const validation = schema.validate(req.params);

        if(validation.error){
            generateErrorUtil(validation.error.message, 401)};

        const schemaBody = Joi.object().keys({
            email: Joi.string().email(),
            userName: Joi.string().min(4).max(25),
            firstName: Joi.string().max(25),
            lastName: Joi.string().max(40),
            dni: Joi.string().min(9),
            phone: Joi.string().max(15),
            address: Joi.string().max(100),
            postCode: Joi.number(),
            city: Joi.string().max(40)
          });
      
          const validationBody = schemaBody.validate(req.body);
      
          if(validationBody.error){
            generateErrorUtil(validationBody.error.message, 401)
          };
        
        const { userId } = req.params;
        const { email, userName, firstName, lastName, dni, phone, address, postCode, city } = req.body;

        await editUserService(userId, email, userName, firstName, lastName, dni, phone, address, postCode, city);

        res.send({
            status: 'ok',
            message:'Usuario actualizado'
        })
         
        }catch(error){
            next(error)
        }

}

export default editUserController;