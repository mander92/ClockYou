import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await selectUserByIdService(userId);

        res.send({
            status: 'ok',
            user,
        });
    } catch (error) {
        next(error);
    }
};

export default getUserController;
