import getPool from '../../db/getPool.js';

const editUserService = async (
    userId,
    firstName,
    lastName,
    dni,
    phone,
    address,
    postCode,
    city
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT addressId FROM users WHERE id = ?
        `,
        [userId]
    );

    await pool.query(
        `
        UPDATE addresses SET address=?, city=?, postCode=? WHERE id=?
        `,
        [address, city, postCode, user[0].addressId]
    );

    await pool.query(
        `
        UPDATE users SET firstName=?, lastName=?, dni=?, phone=? WHERE id=?
        `,
        [firstName, lastName, dni, phone, userId]
    );
};

export default editUserService;
