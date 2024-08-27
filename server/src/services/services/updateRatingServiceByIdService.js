import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const updateRatingServiceByIdService = async (serviceId, rating, userId) => {
  const pool = await getPool();

  const [service] = await pool.query(
    `
        SELECT id FROM services WHERE id=?
        `,
    [serviceId]
  );

  if (!service.length) {
    generateErrorUtil("El servicio no existe", 409);
  }

  await pool.query(
    `
        UPDATE services SET rating=? WHERE id = ? AND status = 'completed'
        `,
    [rating, serviceId]
  );

  const [data] = await pool.query(
    `
        SELECT rating  FROM services WHERE id = ? 
        `,
    [serviceId]
  );
  return data[0];
};

export default updateRatingServiceByIdService;
