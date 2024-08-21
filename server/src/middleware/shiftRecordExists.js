import Joi from 'joi';

import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const shiftRecordExists = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            shiftRecordId: Joi.string().length(36),
        });

        const validation = schema.validate(req.params);

        if (validation.error) {
            generateErrorUtil(validation.error.message, 401);
        }

        const pool = await getPool();

        const { shiftRecordId } = req.params;

        const [shift] = await pool.query(
            `
            SELECT id FROM shiftRecords WHERE id = ? AND deletedAt IS NULL
            `,
            [shiftRecordId]
        );

        if (!shift.length) generateErrorUtil('Registro no encontrado', 400);

        next();
    } catch (error) {
        next(error);
    }
};

export default shiftRecordExists;
