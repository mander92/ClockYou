import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectTypeOfServiceService = async (type, city) => {
    const pool = await getPool();

    if (!type && !city) {
        const [service] = await pool.query(
            `
            SELECT type, description, city from typeOfServices;
            `
        );

        return service;
    }

    if (!type) {
        const [service] = await pool.query(
            `
            SELECT type, description, city FROM typeOfServices WHERE city = ?
            `,
            [city]
        );

        return service;
    }

    if (!city) {
        const [service] = await pool.query(
            `
            SELECT type, description, city FROM typeOfServices WHERE type = ?
            `,

            [type]
        );

        return service;
    }

    const [service] = await pool.query(
        `
        SELECT type, description, city FROM typeOfServices WHERE type = ? AND city = ?
        `,
        [type, city]
    );

    if (!service.length) {
        generateErrorUtil(
            'No existen busquedas con los filtros aplicados',
            401
        );
    }

    return service;
};

export default selectTypeOfServiceService;
