import generateErrorUtil from "../../utils/generateErrorUtil.js";
import deleteTypeOfServiceService from "../../services/typeOfServices/deleteTypeOfServiceService.js";


const deleteTypeOfServiceController = async (req, res, next) => {
    try {
       
        const { id } = req.params;

        const isAdmin = req.userLogged.role;

        if( !isAdmin === 'admin'){
            generateErrorUtil('No tienes permisos de administrador', 401);
        }

        await deleteTypeOfServiceService(id);

            res.send({
                staus: 'ok',
                message: 'Servicio eliminado correctamente'
            });

    } catch (error) {
        next(error)
    }
}

export default deleteTypeOfServiceController