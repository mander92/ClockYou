import getPool from '../../db/getPool.js';

const selectUsersService = async (job, active, city, role) => {
    const pool = await getPool();

    let sqlQuery =
        'SELECT id, role, avatar, email, firstName, lastName, phone, city, job, dni FROM users WHERE 1=1';

    let sqlValues = [];

    if (job) {
        sqlQuery += ' AND job = ?';
        sqlValues.push(job);
    }

    if (city) {
        sqlQuery += ' AND city = ?';
        sqlValues.push(city);
    }

    if (active) {
        sqlQuery += ' AND active = ?';
        sqlValues.push(active);
    }

    if (role) {
        sqlQuery += ' AND role = ?';
        sqlValues.push(role);
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};
export default selectUsersService;
