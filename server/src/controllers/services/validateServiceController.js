import validateServiceService from '../../services/services/validateServiceService.js'

const validateServiceController = async (req, res, next) => {
    try {
        
        const { validationCode } = req.params;

        if(!validationCode){
            next()
        };

        await validateServiceService(validationCode);

        res.send({
            status: 'ok',
            message: 'El servicio ha sido validado correctamente'
        })

    } catch (error) {
        next(error)
    }
}
export default validateServiceController;