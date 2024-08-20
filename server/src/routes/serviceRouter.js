import express from 'express';

import authUser from '../middleware/authUser.js';
import serviceExists from '../middleware/serviceExists.js';
import typeOfserviceExists from '../middleware/typeOfServiceExists.js';

import {
    newServiceController,
    listServicesController,
    detailServiceController,
} from '../controllers/services/index.js';

const router = express.Router();

router.post('/services/:typeOfServiceId',authUser,typeOfserviceExists,newServiceController);

router.get('/services/', authUser, listServicesController);/* El admin puede ver todos los servicios de todos los clientes */

router.get('/services/:serviceId',authUser,serviceExists,detailServiceController);

/* Rutas que necesitamos hacer todavia para esta tabla

GET. -> Service (solo los servicios que ha contratado un cliente en concreto)
DELETE. -> Services/:id
PUT. -> Services/:id

*/

export default router;
