import getPool from '../../db/getPool.js';

const deleteServiceByIdService = async (serviceId) => {
  const pool = await getPool();

  await pool.query(
    `
    UPDATE services SET deletedAt = NOW() WHERE id = ?
    `,
    [serviceId]
  );
};

export default deleteServiceByIdService;
