import express from 'express';

import authUser from '../middleware/authUser.js';
import serviceExists from '../middleware/serviceExists.js';
import typeOfserviceExists from '../middleware/typeOfServiceExists.js';

import {
  newServiceController,
  listServicesController,
  detailServiceController,
  deleteServiceByIdController,
  listClientServiceController,
  editServiceController
} from '../controllers/services/index.js';

const router = express.Router();

router.post(
  '/services/:typeOfServiceId',
  authUser,
  typeOfserviceExists,
  newServiceController
);

router.get('/services/', authUser, listServicesController);

router.get('/services/client', authUser, listClientServiceController);

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

GET. -> Service (solo los servicios que ha contratado un cliente en concreto) ---> Mario
GET. -> Service (solo los servicios que ha contratado un empleado en concreto) ---> Guille

PUT. -> service/:id --> cliente cambia estatus a canceled ---> thanh 
DELETE. -> Services/:id ---> fede (administrador crea en la deletedAt un now())
PUT. -> Services/:id --->

*/

export default router;
