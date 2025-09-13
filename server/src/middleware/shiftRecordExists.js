import Joi from 'joi';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const shiftRecordExists = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            shiftRecordId: Joi.string().length(36).required(),
        });

        const validation = schema.validate(req.params);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { shiftRecordId } = req.params;

        if (!shiftRecordId.length) generateErrorUtil('Registro no encontrado', 400);

        /*console.log("aquiiiiiiiiiiii");

        console.log(shiftRecordId);

        const [shift] = await pool.query(
            `
            SELECT id FROM shiftRecords WHERE id = ? AND deletedAt IS NULL
            `,
            [shiftRecordId]
        );*/

        next();
    } catch (error) {
        next(error);
    }
};

export default shiftRecordExists;
