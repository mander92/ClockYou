import Joi from 'joi';

import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const typeOfServiceExist = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            typeOfServiceId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const pool = await getPool();

        const { typeOfServiceId } = req.params;

        const [service] = await pool.query(
            `
            SELECT id FROM typeOfServices WHERE id=? AND deletedAt IS NULL
            `,
            [typeOfServiceId]
        );

        if (!service.length)
            generateErrorUtil('Tipo de servicio no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default typeOfServiceExist;
