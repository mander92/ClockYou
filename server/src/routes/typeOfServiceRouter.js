import express from 'express';

import authUser from '../middleware/authUser.js';

import {
    listAllTypeOfServicesController,
    newTypeOfServiceController,
    listTypeOfServiceController
} from '../controllers/typeOfServices/index.js';

const router = express.Router();
router.get('/typeOfServices/search', listTypeOfServiceController)
router.get('/typeOfServices', listAllTypeOfServicesController);
router.post('/typeOfServices', authUser, newTypeOfServiceController);



export default router;
