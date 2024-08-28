import selectUsersService from '../../services/users/selectUsersService.js';

const listUsersController = async (req, res, next) => {
    try {
        const { job, active, city, role } = req.query;

        const data = await selectUsersService(job, active, city, role);

        res.send({
            status: 'ok',
            message: 'Lista de usuarios',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listUsersController;
