import express from 'express';

import authUser from '../middleware/authUser.js';

import {
    newTypeOfServiceController,
    listTypeOfServicesController,
    deleteTypeOfServiceController,
    editTypeOfServiceController,
} from '../controllers/typeOfServices/index.js';

const router = express.Router();

router.get('/typeOfServices', listTypeOfServicesController);

router.post('/typeOfServices', authUser, newTypeOfServiceController);

router.delete(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    deleteTypeOfServiceController
);

router.put(
    '/typeOfServices/:typeOfServiceId',
    authUser,
    editTypeOfServiceController
);

export default router;
