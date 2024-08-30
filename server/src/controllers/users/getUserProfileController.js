import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getOwnUserController = async (req, rest, next) => {
    try {
        const data = await selectUserByIdService(req.userLogged.id);
        rest.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default getOwnUserController;
