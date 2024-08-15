import selectAllTypeOfServiceService from "../../services/typeOfServices/selectAllTypeOfServiceService.js";

const listAllTypeOfServicesController = async (req, res, next) =>{
    try {
        

        const services = await selectAllTypeOfServiceService();
        res.send({
            status: 'ok',
            data: {
                services
            }
        })



    } catch (error) {
        next(error)
    }
};

export default listAllTypeOfServicesController;