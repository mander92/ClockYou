import randomstring from 'randomstring';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateRecoverPassService from '../../services/users/updateRecoverPassService.js';

const sendRecoverPassCodeController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await selectUserByEmailService(email);

        if (!user) generateErrorUtil('Usuario no encontrado', 404);

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassService(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Código de recuperación enviado',
        });
    } catch (error) {
        next(error);
    }
};

export default sendRecoverPassCodeController;