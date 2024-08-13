import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from './getPool.js';
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from '../../env.js';

const initDb = async () => {
    try {
        const pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS shiftRecords, servicesAssigned, services, addresses, company, particular, users'
        );

        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS particular (
                id CHAR(36) PRIMARY KEY NOT NULL,
                firstName VARCHAR(30) NOT NULL,
                lastName VARCHAR(30) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
                
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS company (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(50) NOT NULL,
                cif VARCHAR(30) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
                
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS addresses (
                id CHAR(36) PRIMARY KEY NOT NULL,
                address VARCHAR(255),
                postCode VARCHAR(5),
                city VARCHAR(40),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                particularId CHAR(36),
                companyId CHAR(36),
                addressId CHAR(36),
                email VARCHAR(100) UNIQUE NOT NULL,
                userName VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(15),
                role ENUM('admin', 'employee', 'client') DEFAULT 'client',
                description VARCHAR(255),
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (particularId) REFERENCES particular(id),
                FOREIGN KEY (companyId) REFERENCES company(id),
                FOREIGN KEY (addressId) REFERENCES addresses(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id CHAR(36) PRIMARY KEY NOT NULL,
                addressId CHAR(36) NOT NULL,
                type ENUM ('construccion', 'fontaneria', 'electricidad', 'jardineria') NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE,
                startTime DATETIME NOT NULL,
                endTime DATETIME,
                description VARCHAR(500),
                rating INT,
                status ENUM ('acepted', 'rejected', 'pending', 'completed') DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (addressId) REFERENCES addresses(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS servicesAssigned (
                id CHAR(36) PRIMARY KEY NOT NULL,
                employeeId CHAR(36) NOT NULL,
                clientId CHAR(36) NOT NULL,
                serviceId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (employeeId) REFERENCES users(id),
                FOREIGN KEY (clientId) REFERENCES users(id),
                FOREIGN KEY (serviceId) REFERENCES services(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS shiftRecords(
                id CHAR(36) PRIMARY KEY NOT NULL,
                servicesAssignedId CHAR(36) NOT NULL,
                startTime DATETIME NOT NULL,
                endTime DATETIME,
                latitude DECIMAL(10,8),
                longitude DECIMAL(11,8),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (servicesAssignedId) REFERENCES servicesAssigned(id)
            )
        `);

        const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `
            INSERT INTO users (id, email, userName, password, role, active) VALUES (?, ?, ?, ?, ?, ?)`,
            [uuid(), ADMIN_EMAIL, ADMIN_USERNAME, hashedPass, 'admin', 1]
        );

        console.log('¡Tablas creadas!');
        console.log('¡ADMIN creado!');
    } catch (err) {
        console.error('Error creando las tablas', err.message, err);
    } finally {
        process.exit();
    }
};

initDb();