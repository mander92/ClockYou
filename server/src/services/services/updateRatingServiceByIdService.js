import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateRatingServiceByIdService = async (serviceId, rating, userId) => {
  const pool = await getPool();

  const [service] = await pool.query(
    `
        SELECT id FORM services WHERE id=?
        `,
    [serviceId]
  );

  if (!service.length) {
    generateErrorUtil('El servicio no existe', 409);
  }

  const [updatedRating] = await pool.query(
    `
        UPDATE services SET rating=? WHERE id = ? AND status = 'completed'
        `,
    [rating, serviceId]
  );

  return updatedRating;
};

export default updateRatingServiceByIdService;
