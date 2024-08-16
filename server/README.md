# Clock You

Es una aplicación de empresas de Servicios personales diversos como
Jardinería, Limpieza, Seguridad, Mantenimiento de Edificios e Instalaciones, Carreteras, Eventos, Conciertos, Fiestas etc… En definitiva, está pensado para empresas que ofertan servicios personalizados a clientes particulares u otras empresas. El fuerte y atractivo de esta aplicación sería hacer más fácil y rápido la búsqueda del servicio y poder disfrutar de un control centralizado del personal que se encuentra en diversas localizaciones y poder brindarle un Servicio de RRHH totalmente digitalizado e intuitivo.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### particular

| Campo      | Tipo        | Descripción                            |
| ---------- | ----------- | -------------------------------------- |
| id         | VARCHAR(36) | Identificador único del usuario        |
| firstName  | VARCHAR(30) | Nombre del usuario                     |
| lastName   | VARCHAR(30) | Apellidos del usuario                  |
| createdAt  | DATETIME    | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME    | Fecha y hora de la última modificación |

### company

| Campo      | Tipo        | Descripción                            |
| ---------- | ----------- | -------------------------------------- |
| id         | VARCHAR(36) | Identificador único del usuario        |
| name       | VARCHAR(50) | Nombre de la empresa del usuario       |
| cif        | VARCHAR(9)  | CIF de la empresa del usuario          |
| createdAt  | DATETIME    | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME    | Fecha y hora de la última modificación |

### addresses

| Campo      | Tipo         | Descripción                               |
| ---------- | ------------ | ----------------------------------------- |
| id         | VARCHAR(36)  | Identificador único del usuario           |
| address    | VARCHAR(255) | Nombre de calle de la dirección           |
| postCode   | VARCHAR(5)   | Código postal de la dirección             |
| city       | VARCHAR(50)  | Cuidad de la dirección                    |
| createdAt  | DATETIME     | Fecha y hora de creación del la dirección |
| modifiedAt | DATETIME     | Fecha y hora de la última modificación    |

### users

| Campo            | Tipo         | Descripción                                     |
| ---------------- | ------------ | ----------------------------------------------- |
| id               | VARCHAR(36)  | Identificador único del usuario                 |
| email            | VARCHAR(100) | Correo electrónico del usuario                  |
| username         | VARCHAR(30)  | Nombre de usuario del usuario                   |
| password         | VARCHAR(100) | Contraseña del usuario (hash)                   |
| adress           | VARCHAR(255) | Dirección del usuario                           |
| phone            | VARCHAR(15)  | Teléfono del usuario                            |
| role             | ENUM         | Rol del usuario ("admin", "employee", "client") |
| description      | VARCHAR(255) | Descripción del usuario                         |
| avatar           | VARCHAR(100) | URL del avatar del usuario                      |
| active           | BOOLEAN      | Indica si el usuario está activo o no           |
| registrationCode | VARCHAR(30)  | Código de registro del usuario                  |
| recoverPassCode  | VARCHAR(10)  | Código de recuperación de contraseña            |
| particularId     | VARCHAR(36)  | Identificador del usuario particular            |
| companyId        | VARCHAR(36)  | Identificador del usuario empresa               |
| addressId        | VARCHAR(36)  | Identificador de la dirección del usuario       |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario            |
| modifiedAt       | DATETIME     | Fecha y hora de la última modificación          |

### typeOfServices

| Campo       | Tipo         | Descripción                               |
| ----------- | ------------ | ----------------------------------------- |
| id          | VARCHAR(36)  | Identificador único del usuario           |
| type        | VARCHAR(255) | Tipo de servicio                          |
| description | VARCHAR(500) | Descripción del servicio ofertado         |
| city        | VARCHAR(30)  | Cuidad disponible del servicio            |
| createdAt   | DATETIME     | Fecha y hora de creación del la dirección |
| modifiedAt  | DATETIME     | Fecha y hora de la última modificación    |

### services

| Campo           | Tipo         | Descripción                                                              |
| --------------- | ------------ | ------------------------------------------------------------------------ |
| id              | VARCHAR(36)  | Identificador único del usuario                                          |
| location        | VARCHAR(255) | Localización del servicio                                                |
| startDate       | DATE         | Fecha de inicio del servicio                                             |
| endDate         | DATE         | Fecha de fin del servicio                                                |
| startTime       | DATETIME     | Hora de inicio del servicio                                              |
| comments        | VARCHAR(500) | Comentarios adicionales del servicio a contratar                         |
| endTime         | DATETIME     | Hora de fin del servicio                                                 |
| description     | VARCHAR(500) | Descripción del servicio                                                 |
| rating          | INT          | Valoración del 1 al 5                                                    |
| status          | ENUM         | Estado del servicio ("aceptado", "rechazado", "pendiente", "completado") |
| addressId       | VARCHAR(36)  | Identificador de la dirección del servicio                               |
| typeOfServiceId | VARCHAR(36)  | Identificador del tipo de servicio a contratar                           |
| createdAt       | DATETIME     | Fecha y hora de creación del servicio                                    |
| modifiedAt      | DATETIME     | Fecha y hora de la última modificación                                   |

### servicesAssigned

| Campo      | Tipo        | Descripción                            |
| ---------- | ----------- | -------------------------------------- |
| id         | VARCHAR(36) | Identificador único del servicio       |
| employeeId | VARCHAR(36) | Identificador del empleado             |
| clientId   | VARCHAR(36) | Identificador del cliente              |
| serviceId  | VARCHAR(36) | Identificador del servicio             |
| createdAt  | DATETIME    | Fecha y hora de creación del servicio  |
| modifiedAt | DATETIME    | Fecha y hora de la última modificación |

### shiftRecords

| Campo              | Tipo          | Descripción                                   |
| ------------------ | ------------- | --------------------------------------------- |
| id                 | VARCHAR(36)   | Identificador único del registro horario      |
| startTime          | DATETIME      | Hora de inicio del servicio                   |
| endTime            | DATETIME      | Hora de fin del servicio                      |
| latitude           | DECIMAL(10,8) | Latitud del servicio                          |
| longitude          | DECIMAL(11,8) | Longitud del servicio                         |
| servicesAssignedId | VARCHAR(36)   | Identificador del servicio contratado         |
| createdAt          | DATETIME      | Fecha y hora de creación del registro horario |
| modifiedAt         | DATETIME      | Fecha y hora de la última modificación        |

## Endpoints del usuario

-   **POST** - `/users/register` - Crea un nuevo usuario pendiente de activar.
-   **POST** - `/users/employee/register` - Admin crea un nuevo usuario empleado pendiente de activar.
-   **POST** - `/users/login` - Logea a un usuario retornando un token.
-   **POST** - `/users/password` - Actualiza la contraseña de un usuario mediante un código de recuperación.
-   **GET** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
-   **PATCH** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.

## Endpoints de los tipos de servicios

-   **GET** - `/typeOfServices` - Lista todos los servicios ofertados a los clientes.
-   **GET** - `/typeOfServices/search` - Lista todos los servicios ofertados a los clientes con filtros de búsqueda.
-   **POST** - `/typeOfServices` - Admin crea una entrada en los tipos de servicios ofertados a los clientes.
-   **DELETE** - `/typeOfServices/:serviceId` - Admin elimina una entrada en los servicios ofertados a los clientes.

## Endpoints de los servicios

-   **POST** - `/services` - El cliente crea una entrada en el servicio.
