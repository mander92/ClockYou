import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from './getPool.js';
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from '../../env.js';

const initDb = async () => {
    try {
        const pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS shiftRecords, servicesAssigned, services, typeOfServices, users, addresses'
        );

        console.log('Creando tablas...');

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
                email VARCHAR(100) UNIQUE NOT NULL,
                userName VARCHAR(30) UNIQUE NOT NULL,
                firstName VARCHAR(25),
                lastName VARCHAR(40),
                dni VARCHAR(9) UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(15),
                role ENUM('admin', 'employee', 'client') DEFAULT 'client',
                job VARCHAR(20),
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                recoverPasswordCode CHAR(10),
                addressId CHAR(36),
                FOREIGN KEY (addressId) REFERENCES addresses(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS typeOfServices (
                id CHAR(36) PRIMARY KEY NOT NULL,
                type VARCHAR(255) NOT NULL,
                price DECIMAL(10,2),
                description VARCHAR(500) NOT NULL,
                city VARCHAR(30) NOT NULL,
                active ENUM('active', 'paused') DEFAULT 'active',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id CHAR(36) PRIMARY KEY NOT NULL,
                startDate CHAR(10) NOT NULL,
                endDate CHAR(10),
                startTime TIME NOT NULL,
                endTime TIME,
                description VARCHAR(500),
                rating INT,
                numberOfEmployee VARCHAR(2) DEFAULT 1,
                status ENUM ('accepted', 'rejected', 'pending', 'completed', 'canceled') DEFAULT 'pending',
                clientId CHAR(36) NOT NULL,
                addressId CHAR(36) NOT NULL,
                typeOfServicesId CHAR(36) NOT NULL,
                FOREIGN KEY (clientId) REFERENCES users(id),
                FOREIGN KEY (addressId) REFERENCES addresses(id),
                FOREIGN KEY (typeOfServicesId) REFERENCES typeOfServices(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS servicesAssigned (
                id CHAR(36) PRIMARY KEY NOT NULL,
                employeeId CHAR(36) NOT NULL,
                serviceId CHAR(36) NOT NULL,
                FOREIGN KEY (employeeId) REFERENCES users(id),
                FOREIGN KEY (serviceId) REFERENCES services(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS shiftRecords(
                id CHAR(36) PRIMARY KEY NOT NULL,
                startTime DATETIME NOT NULL,
                endTime DATETIME,
                latitude DECIMAL(10,8),
                longitude DECIMAL(11,8),
                servicesAssignedId CHAR(36) NOT NULL,
                FOREIGN KEY (servicesAssignedId) REFERENCES servicesAssigned(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)`,
            [
                uuid(),
                'Jardinería',
                'Mantenimiento de jardines, poda y plantaciones',
                'Coruña',
                '13.50',
            ]
        );

        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)`,
            [
                uuid(),
                'Albaliñería',
                'Servicios de albaliñería básicos',
                'Barcelona',
                '9',
            ]
        );

        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)`,
            [uuid(), 'Clases de KUNG-FU', 'Clases de KUNG-FU', 'Madrid', '12']
        );

        await pool.query(
            `
            INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)`,
            [
                uuid(),
                'Enderezar plátanos',
                'Enderazamos plátanos... consultar con Admin',
                'Sevilla',
                '50',
            ]
        );

        const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `
            INSERT INTO users (id, email, userName, password, role, active) VALUES (?, ?, ?, ?, ?, ?)`,
            [uuid(), ADMIN_EMAIL, ADMIN_USERNAME, hashedPass, 'admin', 1]
        );

        console.log('¡Tablas creadas!');
        console.log('¡Servicios básicos creados!');
        console.log('¡ADMIN creado!');
    } catch (err) {
        console.error('Error creando las tablas', err.message, err);
    } finally {
        process.exit();
    }
};

initDb();
