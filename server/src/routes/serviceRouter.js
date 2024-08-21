import express from 'express';

import authUser from '../middleware/authUser.js';
import serviceExists from '../middleware/serviceExists.js';
import typeOfserviceExists from '../middleware/typeOfServiceExists.js';

import {
    newServiceController,
    listAdminServicesController,
    detailServiceController,
    deleteServiceByIdController,
    listClientServiceController,
    listEmployeeServiceController,
    editServiceController,
    validateServiceController,
} from '../controllers/services/index.js';

const router = express.Router();

router.post(
    '/services/:typeOfServiceId',
    authUser,
    typeOfserviceExists,
    newServiceController
);

router.get('/services/validate/:validationCode', validateServiceController);

router.get('/services/', authUser, listAdminServicesController);

router.get('/services/client', authUser, listClientServiceController);

router.get('/services/employee', authUser, listEmployeeServiceController);

router.get(
    '/services/:serviceId',
    authUser,
    serviceExists,
    detailServiceController
);

router.put(
    '/services/:serviceId',
    authUser,
    serviceExists,
    editServiceController
);

router.delete(
    '/services/:serviceId',
    authUser,
    serviceExists,
    deleteServiceByIdController
);

/* Rutas que necesitamos hacer todavia para esta tabla

GET. -> Service (solo los servicios que ha asignados a un empleado en concreto) ---> Guille

PUT. -> service/:id --> cliente cambia estatus, descripcion, address ---> thanh 
DELETE. -> Services/:id ---> fede (administrador crea en la deletedAt un now())

*/

export default router;
