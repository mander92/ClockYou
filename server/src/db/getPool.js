import mysql from 'mysql2/promise';

import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../env.js';

let pool;

const getPool = async () => {
    try {
        if (!pool) {
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            await poolTemp.query('CREATE DATABASE IF NOT EXISTS ??', [
                MYSQL_DB,
            ]);
            await poolTemp.end();

            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return pool;
    } catch (err) {
        console.error(
            `Error al configurar el pool de MySQL: ${err.message}`,
            err
        );
        throw err;
    }
};

export default getPool;
