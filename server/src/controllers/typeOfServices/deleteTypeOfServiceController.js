import deleteTypeOfServiceService from '../../services/typeOfServices/deleteTypeOfServiceService.js';

const deleteTypeOfServiceController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const deleted = await deleteTypeOfServiceService(typeOfServiceId);

        res.send({
            staus: 'ok',
            eliminado: deleted,
        });
    } catch (error) {
        next(error);
    }
};

export default deleteTypeOfServiceController;
