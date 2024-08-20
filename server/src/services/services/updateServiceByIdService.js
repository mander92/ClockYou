import getPool from '../../db/getPool.js';

const updateServiceByIdService = async (serviceId, address, postCode, city, comments, date, hours) => {
  const pool = await getPool();

    await pool.query(
        `
        UPDATE services SET comments = ?, date = ?, hours = ?
        WHERE id = ?
        `,
        [comments, date, hours, serviceId]
    );


//   await pool.query(
//     `
//     UPDATE addresses SET address = ?, postCode = ?, city = ?
//     WHERE id = ?
//     `,
//     [ address, postCode, city, serviceId ]
//   );


};

export default updateServiceByIdService;