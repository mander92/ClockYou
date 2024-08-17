import randomstring from "randomstring";
import Joi from 'joi';

import generateErrorUtil from "../../utils/generateErrorUtil.js";
import insertUserService from "../../services/users/insertUserService.js";

const registerUserController = async (req, res, next) => {
  try {

    const schema = Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(50),
      userName: Joi.string().min(4).max(25)
    });

    const validation = schema.validate(req.body);

    if(validation.error){
      console.log(validation.error.message)
      generateErrorUtil(validation.error.message, 401)
    }

    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      generateErrorUtil(
        "Ni email, ni password, ni username pueden estar vacíos",
        400
      );
    }

    const registrationCode = randomstring.generate(30);

    await insertUserService(email, password, userName, registrationCode);

    res.send({
      status: "ok",
      message:
        "Usuario registrado correctamente. Revise su email para validar la cuenta",
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
