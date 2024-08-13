import updateUserRegisterService from "../../services/users/updateUserRegisterService.js";

const validateUserController = async (req,res,next) => {
    try {
        
        const { registrationCode } = req.params;

        await updateUserRegisterService(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usario activado correctamente'
        });

    } catch (error) {
        next(error);
    }
}

export default validateUserController;