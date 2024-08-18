import express from 'express';

import authUser from '../middleware/authUser.js';
import typeOfServiceExist from '../middleware/typeOfServiceExists.js';

import {
    newTypeOfServiceController,
    listTypeOfServicesController,
    deleteTypeOfServiceController,
    editTypeOfServiceController,
    detailTypeOfServicesController,
} from '../controllers/typeOfServices/index.js';

const router = express.Router();

router.get('/typeOfServices', listTypeOfServicesController);

router.get('/typeOfServices/:typeOfServiceId', detailTypeOfServicesController);

router.post('/typeOfServices', authUser, newTypeOfServiceController);

router.delete(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    deleteTypeOfServiceController
);

router.put(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    typeOfServiceExist,
    editTypeOfServiceController
);

export default router;
