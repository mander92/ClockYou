import Joi from 'joi';

import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const serviceExists = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            serviceId: Joi.string().length(36).required(),
        });

        const validation = schema.validate(req.params);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const pool = await getPool();

        const { serviceId } = req.params;

        const [service] = await pool.query(
            `
            SELECT id FROM services WHERE id=? AND deletedAt IS NULL
            `,
            [serviceId]
        );
        if (!service.length) generateErrorUtil('Servicio no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default serviceExists;
