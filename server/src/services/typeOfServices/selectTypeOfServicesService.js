import getPool from '../../db/getPool.js';

const selectTypeOfServiceService = async (type, city) => {
    const pool = await getPool();

    if (!type && !city) {
        const [service] = await pool.query(
            `
            SELECT id, type, description, city, price from typeOfServices WHERE deletedAt IS NULL
            `
        );

        return service;
    }

    if (type && city) {
        const [service] = await pool.query(
            `
            SELECT id, type, description, city, price from typeOfServices WHERE deletedAt IS NULL AND type = ? AND city = ?
            `,
            [type, city]
        );

        return service;
    }

    if (!type) {
        const [service] = await pool.query(
            `
            SELECT id, type, description, city, price FROM typeOfServices WHERE city = ? AND deletedAt IS NULL
            `,
            [city]
        );

        return service;
    }

    if (!city) {
        const [service] = await pool.query(
            `
            SELECT id, type, description, city, price FROM typeOfServices WHERE type = ? AND deletedAt IS NULL
            `,

            [type]
        );

        return service[0];
    }
};

export default selectTypeOfServiceService;
