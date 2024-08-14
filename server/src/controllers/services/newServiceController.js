
import insertService from '../../services/services/insertService.js';


import generateErrorUtil from '../../utils/generateErrorUtil.js';


const newServiceController = async (req, res, next) => {
    try {
        const { type, price, description } = req.body;

        if (!type || !price || !description) {
            generateErrorUtil('Faltan campos', 400);
        }

        const serviceId = await insertService(
            type,
            description,
            price,
            req.user.id
        );

        res.status(201).send({
            status: 'ok',
            data: {
                service: {
                    id: serviceId,
                    userId: req.user.id,
                    type,
                    description,
                    price,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newServiceController;
