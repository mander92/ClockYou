import getPool from '../../db/getPool.js';

const selectEmployeeService = async (job, active, city) => {
    const pool = await getPool();

    if (!job && !active && !city) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1 AND role = 'employee'
            `
        );

        return allUsers;
    }

    if (job && active && city) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = ? AND job = ? AND city = ? AND role = 'employee'
            `,
            [active, job, city]
        );

        return allUsers;
    }

    if (job && city) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE job = ? AND city = ? AND role = 'employee'
            `,
            [job, city]
        );

        return allUsers;
    }

    if (job && active) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE job = ? AND active = ? AND role = 'employee'
            `,
            [job, active]
        );

        return allUsers;
    }

    if (city && active) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE city = ? AND active = ? AND role = 'employee'
            `,
            [city, active]
        );

        return allUsers;
    }

    if (!job && !city) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = ? AND role = 'employee'
            `,
            [active]
        );

        return allUsers;
    }

    if (!city && !active) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1 AND job = ? AND role = 'employee'
            `,
            [job]
        );

        return allUsers;
    }

    if (!job && !active) {
        const [allUsers] = await pool.query(
            `
            SELECT a.city, u.job, u.id, u.firstName, u.lastName
            FROM addresses a
            INNER JOIN 
            users u
            ON a.id = u.addressId
            WHERE active = 1 AND city = ? AND role = 'employee'
            `,
            [city]
        );

        return allUsers;
    }
};
export default selectEmployeeService;
