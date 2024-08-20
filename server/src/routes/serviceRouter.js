import express from 'express';

import authUser from '../middleware/authUser.js';
import serviceExists from '../middleware/serviceExists.js';
import typeOfserviceExists from '../middleware/typeOfServiceExists.js';

import {
  newServiceController,
  listServicesController,
  detailServiceController,
  deleteServiceByIdController,
} from '../controllers/services/index.js';

const router = express.Router();

router.post(
  '/services/:typeOfServiceId',
  authUser,
  typeOfserviceExists,
  newServiceController
);

router.get('/services/', authUser, listServicesController);
router.get(
  '/services/:serviceId',
  authUser,
  serviceExists,
  detailServiceController
);

router.delete(
  '/services/:serviceId',
  authUser,
  serviceExists,
  deleteServiceByIdController
);

/* Rutas que necesitamos hacer todavia para esta tabla

DELETE. -> Services/:id
PUT. -> Services/:id

*/

export default router;
