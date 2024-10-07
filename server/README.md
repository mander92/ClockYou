# Clock You

Es una aplicación de empresas de Servicios personales diversos como
Clases Particulares, Entrenamientos Personales, Cuidado de Mascotas, Limpiezas A Domicilio, Masajes, Mantenimientos Del Hogar, Clases Particulares, etc… En definitiva, está pensado para empresas que ofertan servicios personalizados a clientes particulares. El fuerte y atractivo de esta aplicación sería hacer más fácil y rápido la búsqueda del servicio y poder disfrutar de un control centralizado del personal que se encuentra en diversas localizaciones y poder brindarle un Servicio de RRHH totalmente digitalizado e intuitivo.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### addresses

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | CHAR(36)     | Identificador único de la dirección    |
| address    | VARCHAR(255) | Nombre de calle de la dirección        |
| postCode   | CHAR(5)      | Código postal de la dirección          |
| city       | VARCHAR(40)  | Cuidad de la dirección                 |
| createdAt  | TIMESTAMP    | Fecha y hora de creación               |
| modifiedAt | TIMESTAMP    | Fecha y hora de la última modificación |
| deletedAt  | TIMESTAMP    | Fecha y hora del borrado lógico        |

### users

| Campo               | Tipo         | Descripción                                     |
| ------------------- | ------------ | ----------------------------------------------- |
| id                  | CHAR(36)     | Identificador único del usuario                 |
| email               | VARCHAR(100) | Correo electrónico del usuario                  |
| firstName           | VARCHAR(25)  | Nombre del usuario                              |
| lastName            | VARCHAR(50)  | Apellidos del usuario                           |
| dni                 | CHAR(11)     | DNI del usuario                                 |
| password            | VARCHAR(255) | Contraseña del usuario (hash)                   |
| phone               | VARCHAR(15)  | Teléfono del usuario                            |
| city                | VARCHAR(25)  | Ciudad de trabajo del empleado                  |
| role                | ENUM         | Rol del usuario ("admin", "employee", "client") |
| job                 | VARCHAR(20)  | Trabajo del empleado                            |
| avatar              | CHAR(40)     | URL del avatar del usuario                      |
| active              | BOOLEAN      | Indica si el usuario está activo o no           |
| registrationCode    | VARCHAR(30)  | Código de registro del usuario                  |
| recoverPasswordCode | VARCHAR(10)  | Código de recuperación de contraseña            |
| createdAt           | TIMESTAMP    | Fecha y hora de creación                        |
| modifiedAt          | TIMESTAMP    | Fecha y hora de la última modificación          |
| deletedAt           | TIMESTAMP    | Fecha y hora del borrado lógico                 |

### typeOfServices

| Campo       | Tipo         | Descripción                              |
| ----------- | ------------ | ---------------------------------------- |
| id          | CHAR(36)     | Identificador único del tipo de servicio |
| type        | VARCHAR(255) | Tipo de servicio                         |
| description | VARCHAR(500) | Descripción del servicio ofertado        |
| city        | VARCHAR(30)  | Cuidad disponible del servicio           |
| image       | CHAR(40)     | Url de la imágen de tipo de servicio     |
| createdAt   | TIMESTAMP    | Fecha y hora de creación                 |
| modifiedAt  | TIMESTAMP    | Fecha y hora de la última modificación   |
| deletedAt   | TIMESTAMP    | Fecha y hora del borrado lógico          |

### services

| Campo           | Tipo         | Descripción                                                             |
| --------------- | ------------ | ----------------------------------------------------------------------- |
| id              | CHAR(36)     | Identificador único del servicio                                        |
| startDateTime   | TIMESTAMP    | Fecha y hora de inicio del servicio                                     |
| endDateTime     | TIMESTAMP    | Fecha y hora de fin del servicio                                        |
| hours           | INT UNSIGNED | Horas a contratar por el usuario, valores entre 1 y 8                   |
| numberOfPeople  | INT UNSIGNED | Número de personas necesarias                                           |
| rating          | INT UNSIGNED | Valoración del cliente sobre el servicio realizado, valores entre 1 y 5 |
| totalPrice      | DECIMAL      | Precio total del servicio contratado por el cliente                     |
| comments        | VARCHAR(500) | Comentarios adicionales del servicio a contratar                        |
| status          | ENUM         | Estado del servicio                                                     |
| validationCode  | VARCHAR(30)  | Código de validación para el usuario para aceptar el servicio           |
| clientId        | CHAR(36)     | Identificador del cliente                                               |
| addressId       | CHAR(36)     | Identificador de la dirección del servicio                              |
| typeOfServiceId | HAR(36)      | Identificador del tipo de servicio contratado                           |
| createdAt       | TIMESTAMP    | Fecha y hora de creación                                                |
| modifiedAt      | TIMESTAMP    | Fecha y hora de la última modificación                                  |
| deletedAt       | TIMESTAMP    | Fecha y hora del borrado lógico                                         |

### shiftRecords

| Campo        | Tipo          | Descripción                                        |
| ------------ | ------------- | -------------------------------------------------- |
| id           | CHAR(36)      | Identificador único del registro horario           |
| clockIn      | TIMESTAMP     | Empleado registra hora de inicio del servicio      |
| clockOut     | TIMESTAMP     | Empleado registra hora de fin del servicio         |
| latitudeIn   | DECIMAL(10,8) | Latitud inicial del servicio                       |
| longitudeIn  | DECIMAL(11,8) | Longitud inicial del servicio                      |
| latitudeOut  | DECIMAL(10,8) | Latitud final del servicio                         |
| longitudeOut | DECIMAL(11,8) | Longitud final del servicio                        |
| serviceId    | CHAR(36)      | Identificador del servicio contratado              |
| employeeId   | CHAR(36)      | Identificador del empleado que realiza el servicio |
| createdAt    | TIMESTAMP     | Fecha y hora de creación                           |
| modifiedAt   | TIMESTAMP     | Fecha y hora de la última modificación             |
| deletedAt    | TIMESTAMP     | Fecha y hora del borrado lógico                    |

## Endpoints del usuario

-   **GET** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
-   **GET** - `/users/` - Admin obtiene la lista de todos los usuarios.
-   **GET** - `/user/` - Perfil del usuario logueado.
-   **GET** - `/user/admin/:userId` - Admin obtiene el perfil de un usuario.
-   **POST** - `/users/register` - Crea un nuevo usuario pendiente de activar.
-   **POST** - `/users/login` - Logea a un usuario retornando un token.
-   **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.
-   **POST** - `/users/admin/register` - Admin crea un nuevo usuario tipo administrador o empleado.
-   **POST** - `/users/avatar/:userId` - Usuario crea o edita su imágen de avatar.
-   **PATCH** - `/users/password` - Recupera la contraseña de un usuario mediante un código de recuperación.
-   **PUT** - `/users/password` - Usuario edita su contraseña.
-   **DELETE** - `/user/:userId` - Usuario elimina su cuenta.

## Endpoints de los tipos de servicios

-   **GET** - `/typeOfServices` - Lista todos los servicios ofertados a los clientes con filtros de búsqueda.
-   **GET** - `/typeOfServices/:typeOfServiceId` - Detalle de un tipo de servicio.
-   **POST** - `/typeOfServices` - Admin crea una entrada en los tipos de servicios ofertados a los clientes.
-   **PATCH** - `/typeOfServices/:typeOfServiceId` - Admin edita la imágen en los tipos de servicios ofertados a los clientes.
-   **PUT** - `/typeOfServices/:typeOfServiceId` - Admin edita una entrada en los tipos de servicios ofertados a los clientes.
-   **DELETE** - `/typeOfServices/:serviceId` - Admin elimina una entrada en los servicios ofertados a los clientes.

## Endpoints de los servicios

-   **GET** - `/services` - Admin lista todos los servicios contratados por clientes con filtros de búsqueda.
-   **GET** - `/services/client` - Cliente lista todos sus servicios contratados con filtros de búsqueda.
-   **GET** - `/services/employee` - Empleado lista todos sus servicios con filtros de búsqueda.
-   **GET** - `/services/:serviceId` - Se obtiene el detalle de un servicio.
-   **GET** - `/services/validate/:validationCode` - Cliente confirma un servicio.
-   **POST** - `/services/:typeOfServiceId` - Cliente solicita un servicio.
-   **PATCH** - `/services/:serviceId` - Cliente valora un servicio realizado.
-   **PUT** - `/services/:serviceId` - Cliente edita un servicio solicitado.
-   **DELETE** - `/services/:serviceId` - Cliente elimina un servicio solicitado.

## Endpoints de registros horarios

-   **GET** - `/shiftrecords` - Admin lista todos los registros horarios con filtros de búsqueda.
-   **GET** - `/shiftrecords/:shiftRecordId` - Admin obtiene el detalle de un registro horario.
-   **POST** - `/shiftrecords/:serviceId` - Admin asigna un empleado a un servicio.
-   **PUT** - `/shiftrecords/:shiftRecordId` - Empleado registra la hora de inicio del servicio.
-   **PUT** - `/shiftrecords/edit/:shiftRecordId` - Admin edita los registros horarios del servicio.
-   **PATCH** - `/shiftrecords/:shiftRecordId` - Empleado registra la hora de fin del servicio.
