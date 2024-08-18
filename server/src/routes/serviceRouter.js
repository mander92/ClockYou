import express from 'express';

import authUser from '../middleware/authUser.js';
import serviceExists from '../middleware/serviceExists.js';

import {
    newServiceController,
    listServicesController,
    detailServiceController,
} from '../controllers/services/index.js';

const router = express.Router();

router.post('/services/:typeOfServiceId', authUser, newServiceController);

router.get('/services/', authUser, listServicesController);

router.get(
    '/services/:serviceId',
    authUser,
    serviceExists,
    detailServiceController
);

/* Rutas que necesitamos hacer todavia para esta tabla

DELETE. -> Services/:id
PUT. -> Services/:id

*/

export default router;
