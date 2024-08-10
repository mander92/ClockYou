CREATE DATABASE IF NOT EXISTS clock;
USE clock; 
-- DROP TABLE IF EXISTS users; -- BORRA VARIAS TABLAS ==> En ORDEN inverso al de creación
CREATE TABLE IF NOT EXISTS users (
	id CHAR(36) PRIMARY KEY NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	username VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	role ENUM('admin', 'employee', 'client') DEFAULT 'client',
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	biography VARCHAR(255),
	avatar VARCHAR(100),
	maxWeeklyHours CHAR(2),
	active BOOLEAN DEFAULT false,
	registrationCode CHAR(30),
	recoverPassCode CHAR(10),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
	modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
)
