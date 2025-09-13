import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from './getPool.js';

import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../env.js';

const initDb = async () => {

    try {
        const pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            `
            DROP TABLE IF EXISTS shiftRecords, services, typeOfServices, users, addresses, personsAssigned
            `
        );

        console.log('Creando tablas...');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS addresses (
                id CHAR(36) PRIMARY KEY NOT NULL,
                address VARCHAR(255) NOT NULL,
                postCode CHAR(5) NOT NULL,
                city VARCHAR(40) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        console.log('Address creada');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                firstName VARCHAR(25),
                lastName VARCHAR(50),
                dni CHAR(11) UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(15),
                city VARCHAR(25),
                role ENUM('admin', 'employee', 'client') DEFAULT 'client',
                job VARCHAR(20),
                avatar CHAR(40),
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                recoverPasswordCode CHAR(10),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        console.log('users creada');


        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS typeOfServices (
                id CHAR(36) PRIMARY KEY NOT NULL,
                type VARCHAR(255) NOT NULL,
                price DECIMAL(5,2) NOT NULL,
                description VARCHAR(250) NOT NULL,
                city VARCHAR(30) NOT NULL,
                image CHAR(40),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        console.log('typeOfServices creada');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS services (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(30) NOT NULL,
                startDateTime TIMESTAMP NOT NULL,
                endDateTime TIMESTAMP,
                hours INT UNSIGNED NOT NULL CHECK (hours BETWEEN 1 AND 8),
                numberOfPeople INT UNSIGNED NOT NULL,
                rating INT UNSIGNED CHECK (rating BETWEEN 1 AND 5),
                totalPrice DECIMAL(10, 2),
                comments VARCHAR(250),
                status ENUM ('accepted', 'rejected', 'pending', 'completed', 'confirmed', 'canceled') DEFAULT 'pending',
                validationCode VARCHAR(30),
                clientId CHAR(36) NOT NULL,
                addressId CHAR(36) NOT NULL,
                typeOfServicesId CHAR(36) NOT NULL,
                FOREIGN KEY (clientId) REFERENCES users(id),
                FOREIGN KEY (addressId) REFERENCES addresses(id),
                FOREIGN KEY (typeOfServicesId) REFERENCES typeOfServices(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        console.log('services creada');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS shiftRecords(
                id CHAR(36) PRIMARY KEY NOT NULL,
                clockIn TIMESTAMP,
                clockOut TIMESTAMP,
                latitudeIn DECIMAL(10,8),
                longitudeIn DECIMAL(11,8),
                latitudeOut DECIMAL(10,8),
                longitudeOut DECIMAL(11,8),
                serviceId CHAR(36) NOT NULL,
                employeeId CHAR(36) NOT NULL,
                FOREIGN KEY (serviceId) REFERENCES services(id),
                FOREIGN KEY (employeeId) REFERENCES users(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        console.log('shiftRecord creada');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS personsAssigned(
                id CHAR(36) PRIMARY KEY NOT NULL,
                pin CHAR(8),
                employeeId CHAR(36) NOT NULL,
                serviceId CHAR(36) NOT NULL,
                FOREIGN KEY (employeeId) REFERENCES users(id),
                FOREIGN KEY (serviceId) REFERENCES services(id))
            `
        );

        console.log('personAssinged creada');

        const insertTypeOfService = async (
            id,
            type,
            description,
            city,
            price
        ) => {
            await pool.query(
                `
                INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)
                `,
                [id, type, description, city, price]
            );
        };

        await insertTypeOfService(
            uuid(),
            'Clases Particulares',
            'Profesores especializados para reforzar conocimientos en distintas materias.',
            'Coruña',
            '20'
        );

        await insertTypeOfService(
            uuid(),
            'Entrenamiento Personal',
            'Entrenadores que te guían para alcanzar tus metas de salud y bienestar.',
            'Barcelona',
            '28'
        );

        await insertTypeOfService(
            uuid(),
            'Cuidado De Mascotas',
            'Atención y paseos para tus mascotas cuando lo necesites.',
            'Madrid',
            '12.50'
        );

        await insertTypeOfService(
            uuid(),
            'Limpieza A Domicilio',
            'Profesionales para la limpieza y organización de tu hogar.',
            'Sevilla',
            '30'
        );

        await insertTypeOfService(
            uuid(),
            'Masajes',
            'Sesiones de relajación y bienestar a domicilio.',
            'Zaragoza',
            '25'
        );

        await insertTypeOfService(
            uuid(),
            'Mantenimiento Del Hogar',
            'Reparaciones y soluciones rápidas para el hogar.',
            'Castellón',
            '28.80'
        );

        await insertTypeOfService(
            uuid(),
            'Guía Turístico',
            'Tours personalizados y acompañamiento en recorridos.',
            'Portugal',
            '21.30'
        );

        await insertTypeOfService(
            uuid(),
            'Peluquería',
            'Esteticistas a domicilio para cortes de pelo y tratamientos de belleza.',
            'Bilbao',
            '13.50'
        );

        await insertTypeOfService(
            uuid(),
            'Lavado De Automóviles',
            'Limpieza y detallado de vehículos en el lugar que prefieras.',
            'León',
            '22'
        );

        await insertTypeOfService(
            uuid(),
            'Mecánico De Bicicletas',
            'Reparación y mantenimiento de bicicletas.',
            'Alicante',
            '31.50'
        );

        await insertTypeOfService(
            uuid(),
            'Clases Particulares',
            'Profesores especializados para reforzar conocimientos en distintas materias.',
            'Madrid',
            '25'
        );

        await insertTypeOfService(
            uuid(),
            'Entrenamiento Personal',
            'Entrenadores que te guían para alcanzar tus metas de salud y bienestar.',
            'Alicante',
            '22'
        );

        await insertTypeOfService(
            uuid(),
            'Cuidado De Mascotas',
            'Atención y paseos para tus mascotas cuando lo necesites.',
            'Barcelona',
            '15'
        );

        await insertTypeOfService(
            uuid(),
            'Limpieza A Domicilio',
            'Profesionales para la limpieza y organización de tu hogar.',
            'Pamplona',
            '24'
        );

        await insertTypeOfService(
            uuid(),
            'Masajes',
            'Sesiones de relajación y bienestar a domicilio.',
            'Castellón',
            '22.90'
        );

        await insertTypeOfService(
            uuid(),
            'Mantenimiento Del Hogar',
            'Reparaciones y soluciones rápidas para el hogar.',
            'Portugal',
            '30'
        );

        await insertTypeOfService(
            uuid(),
            'Guía Turístico',
            'Tours personalizados y acompañamiento en recorridos.',
            'Bilbao',
            '23.50'
        );

        await insertTypeOfService(
            uuid(),
            'Peluquería',
            'Esteticistas a domicilio para cortes de pelo y tratamientos de belleza.',
            'León',
            '13.50'
        );

        await insertTypeOfService(
            uuid(),
            'Lavado De Automóviles',
            'Limpieza y detallado de vehículos en el lugar que prefieras.',
            'Alicante',
            '24'
        );

        await insertTypeOfService(
            uuid(),
            'Mecánico De Bicicletas',
            'Reparación y mantenimiento de bicicletas.',
            'Coruña',
            '30'
        );

        const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `
            INSERT INTO users (id, email, password, role, active) VALUES (?, ?, ?, ?, ?)
            `,
            [uuid(), ADMIN_EMAIL, hashedPass, 'admin', 1]
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
