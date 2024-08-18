import getPool from '../../db/getPool.js';

const selectServiceService = async (status) => {
    const pool = await getPool();

    if (!status) {
        const [services] = await pool.query(
            `
            SELECT * FROM services;
            `
        );

        return services;
    }

    if (status) {
        const [services] = await pool.query(
            `
            SELECT * FROM services WHERE status = ?
            `,
            [status]
        );

        return services;
    }
};

export default selectServiceService;
