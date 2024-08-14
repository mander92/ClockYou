
import selectAllServices from '../../services/services/selectAllServices.js';


const listServicesController = async (req, res, next) => {
    try {
        
        const products = await selectAllServices();

        res.send({
            status: 'ok',
            data: {
                services,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listServicesController;