import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
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

router.get(
    '/typeOfServices/:typeOfServiceId',
    typeOfServiceExist,
    detailTypeOfServicesController
);

router.post('/typeOfServices', authUser, isAdmin, newTypeOfServiceController);

router.put(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExist,
    editTypeOfServiceController
);

router.delete(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    isAdmin,
    typeOfServiceExist,
    deleteTypeOfServiceController
);

export default router;
