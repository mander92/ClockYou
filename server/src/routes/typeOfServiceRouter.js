import express from 'express';

import {
    listAllTypeOfServicesController,
    newTypeOfServiceController
} from '../controllers/typeOfServices/index.js'

import serviceExist from '../middleware/serviceExist.js';
import authUserAdmin from '../middleware/authUserAdmin.js';


const router = express.Router();
router.get('/typeOfServices', listAllTypeOfServicesController)
router.post('/typeOfServices', authUserAdmin, serviceExist, newTypeOfServiceController);

export default router;