import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdService = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id, role, avatar, email, firstName, lastName, phone, dni, job, city, active
            FROM users
            WHERE id=?
        `,
    [userId]
  );

  if (!user.length) generateErrorUtil('No existe ese usuario', 404);

  return user[0];
};

export default selectUserByIdService;
