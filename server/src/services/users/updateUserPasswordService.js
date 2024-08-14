import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectUserByEmailService from './selectUserByEmailService.js';

const updateUserPasswordService = async (
  email,
  recoverPassCode,
  newPassword
) => {
  const pool = await getPool();

  const user = await selectUserByEmailService(email);

  if (!user || user.recoverPassCode !== recoverPassCode) {
    throw generateErrorUtil('Email o código de recuperación incorrecto', 409);
  }

  const hashPassCode = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
        UPDATE users
        SET password=?, recoverPassCode=null
        WHERE recoverPassCode=?`
        ,
    [hashPassCode, recoverPassCode]
  );
};

export default updateUserPasswordService;