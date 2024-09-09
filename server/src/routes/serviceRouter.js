import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import isClient from '../middleware/isClient.js';
import isEmployee from '../middleware/isEmployee.js';
import serviceExists from '../middleware/serviceExists.js';
import typeOfServiceExists from '../middleware/typeOfServiceExists.js';

import {
    newServiceController,
    listAdminServicesController,
    detailServiceController,
    deleteServiceByIdController,
    listClientServiceController,
    listEmployeeServiceController,
    editServiceController,
    validateServiceController,
    editRatingServiceByIdController,
} from '../controllers/services/index.js';

const router = express.Router();

router.get('/services', authUser, isAdmin, listAdminServicesController);

router.get('/services/client', authUser, isClient, listClientServiceController);

router.get(
    '/services/employee',
    authUser,
    isEmployee,
    listEmployeeServiceController
);

router.get(
    '/services/:serviceId',
    authUser,
    isAdmin,
    serviceExists,
    detailServiceController
);

router.get('/services/validate/:validationCode', validateServiceController);

router.post(
    '/services/:typeOfServiceId',
    authUser,
    isClient,
    typeOfServiceExists,
    newServiceController
);

router.patch(
    '/services/:serviceId/',
    authUser,
    isClient,
    serviceExists,
    editRatingServiceByIdController
);

router.put(
    '/services/:serviceId',
    authUser,
    isClient,
    serviceExists,
    editServiceController
);

router.delete(
    '/services/:serviceId',
    authUser,
    isClient,
    serviceExists,
    deleteServiceByIdController
);

export default router;
