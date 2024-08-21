import deleteTypeOfServiceService from '../../services/typeOfServices/deleteTypeOfServiceService.js';

const deleteTypeOfServiceController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        await deleteTypeOfServiceService(typeOfServiceId);

        res.send({
            staus: 'ok',
            message: 'Servicio eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteTypeOfServiceController;
