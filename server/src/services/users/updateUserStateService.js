import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getPool from "../../db/getPool.js";

const updateUserStateService = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    "SELECT id FROM users WHERE id = ? AND deletedAt IS NOT NULL",
    [userId]
  );

  if (user.length) {
    generateErrorUtil("El usuario ya fue eliminado", 400);
  }

  await pool.query(
    "UPDATE users SET active = 0, deletedAt = CURRENT_TIMESTAMP WHERE id = ?",
    [userId]
  );
};

export default updateUserStateService;
