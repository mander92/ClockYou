import getPool from './getPool.js';
import {
    ADMIN_ID,
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_ROLE,
    ADMIN_FIRSTNAME,
    ADMIN_LASTNAME,
    ADMIN_ACTIVE,
} from '../../env.js';

const initDb = async () => {
    try {
        const pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS shiftRecords, servicesAssigned, services, users'
        );

        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                userName VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                address VARCHAR (255),
                companyName VARCHAR(255),
                cif VARCHAR(10),
                role ENUM('admin', 'employee', 'client') DEFAULT 'client',
                firstName VARCHAR(30) NOT NULL,
                lastName VARCHAR(30) NOT NULL,
                description VARCHAR(255),
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id CHAR(36) PRIMARY KEY NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                type VARCHAR(100) NOT NULL,
                location VARCHAR (255) NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE,
                startTime DATETIME NOT NULL,
                endTime DATETIME,
                description VARCHAR(500),
                rating INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS servicesAssigned (
                id CHAR(36) PRIMARY KEY NOT NULL,
                userId CHAR(36) NOT NULL,
                serviceId CHAR(36) NOT NULL,
                status BOOLEAN DEFAULT false,
                comments VARCHAR(255),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (serviceId) REFERENCES services(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS shiftRecords(
                id CHAR(36) PRIMARY KEY NOT NULL,
                employeeId CHAR(36) NOT NULL,
                servicesAssignedId CHAR(36) NOT NULL,
                startTime DATETIME NOT NULL,
                endTime DATETIME,
                totalTime TIME,
                latitude DECIMAL(10,8),
                longitude DECIMAL(11,8),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (employeeId) REFERENCES users(id),
                FOREIGN KEY (servicesAssignedId) REFERENCES servicesAssigned(id)
            )
        `);

        await pool.query(
            `
            INSERT INTO users (id, email, userName, password, role, firstName, lastName, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                ADMIN_ID,
                ADMIN_EMAIL,
                ADMIN_USERNAME,
                ADMIN_PASSWORD,
                ADMIN_ROLE,
                ADMIN_FIRSTNAME,
                ADMIN_LASTNAME,
                ADMIN_ACTIVE,
            ]
        );

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error('Error creando las tablas', err.message, err);
    }
};

initDb();
