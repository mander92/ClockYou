import express from 'express';

import authUser from '../middleware/authUser.js';
import newServiceController from '../controllers/services/newServiceController.js';

const router = express.Router();

router.post('/services/:typeOfServiceId', authUser, newServiceController);


/* Rutas que necesitamos hacer todavia para esta tabla

GET. -> AllServicesRouter
GET. -> Services/:id
DELETE. -> Services/:id
PUT. -> Services/:id

*/ 

export default router;
