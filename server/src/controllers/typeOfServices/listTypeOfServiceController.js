import selectServiceByType from '../../services/typeOfServices/selectServiceByType.js'


const listTypeOfServiceController = async (req, res, next) => {
    try {
        
        const { type , city } = req.query;

        if( !type && !city ){
           next()
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