import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteServiceByIdService = async (serviceId) => {
    const pool = await getPool();

    const [verify] = await pool.query(
        `
      SELECT id FROM services WHERE status = 'pending' AND id = ?
      `,
        [serviceId]
    );

    if (!verify.length) {
        generateErrorUtil(
            'No puedes eliminar el servicio debido a su estado',
            401
        );
    }

    await pool.query(
        `
        UPDATE services SET deletedAt = NOW(), status = 'canceled' WHERE id = ? 
        `,
        [serviceId]
    );
};

export default deleteServiceByIdService;
