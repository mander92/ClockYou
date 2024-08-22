import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import typeOfServiceExists from '../middleware/typeOfServiceExists.js';

import {
    newTypeOfServiceController,
    listTypeOfServicesController,
    deleteTypeOfServiceController,
    editTypeOfServiceController,
    detailTypeOfServicesController,
} from '../controllers/typeOfServices/index.js';

const router = express.Router();

router.get('/typeOfServices', listTypeOfServicesController);

router.get(
    '/typeOfServices/:typeOfServiceId',
    typeOfServiceExists,
    detailTypeOfServicesController
);

router.post('/typeOfServices', authUser, isAdmin, newTypeOfServiceController);

router.put(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExists,
    editTypeOfServiceController
);

router.delete(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExists,
    deleteTypeOfServiceController
);

export default router;
