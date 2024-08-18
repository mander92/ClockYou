import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceService = async (type, city) => {
    const pool = await getPool();

    if (!type && !city) {
        const [service] = await pool.query(
            `
            SELECT type, description, city, price from typeOfServices WHERE active = 'active'
            `
        );

        return service;
    }

    if (type && city) {
        const [service] = await pool.query(
            `
            SELECT type, description, city, price from typeOfServices WHERE active = 'active' AND type = ? AND city = ?
            `,
            [type, city]
        );

        return service;
    }

    if (!type) {
        const [service] = await pool.query(
            `
            SELECT type, description, city, price FROM typeOfServices WHERE city = ? AND active = 'active'
            `,
            [city]
        );

        return service;
    }

    if (!city) {
        const [service] = await pool.query(
            `
            SELECT type, description, city, price FROM typeOfServices WHERE type = ? AND active = 'active'
            `,

            [type]
        );

        return service;
    }
};

export default selectTypeOfServiceService;
