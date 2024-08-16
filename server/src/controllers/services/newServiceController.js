import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertServiceService from '../../services/services/insertServiceService.js';

const newServiceController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;
        const {
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
            city,
            postCode,
        } = req.body;

        if (!startTime || !startDate || !address || !city || !postCode) {
            generateErrorUtil('Faltan campos', 401);
        }

        const [data] = await insertServiceService(
            typeOfServiceId,
            startTime,
            endTime,
            startDate,
            endDate,
            description,
            address,
            city,
            postCode
        );

        res.send({
            status: 'ok',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default newServiceController;
