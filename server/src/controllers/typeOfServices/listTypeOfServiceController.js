import selectServiceByType from '../../services/typeOfServices/selectServiceByType.js'
import generateErrorUtil from '../../utils/generateErrorUtil.js';


const listTypeOfServiceController = async (req, res, next) => {
    try {
        
        const { type , city } = req.query;

        if( !type && !city ){
           generateErrorUtil('Los campos estan vacios', 401);
        }

        const service = await selectServiceByType(type, city);

        res.send({
            status: 'ok',
            data: {
                service
            }
        })

    } catch (error) {
        next(error)
    }
}

export default listTypeOfServiceController;