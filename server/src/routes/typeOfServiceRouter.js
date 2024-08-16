import express from 'express';

import authUser from '../middleware/authUser.js';

import {
    listAllTypeOfServicesController,
    newTypeOfServiceController,
    listTypeOfServiceController,
    deleteTypeOfServiceController,
} from '../controllers/typeOfServices/index.js';

const router = express.Router();
router.get('/typeOfServices/search', listTypeOfServiceController);

router.get('/typeOfServices', listAllTypeOfServicesController);

router.post('/typeOfServices', authUser, newTypeOfServiceController);

router.delete(
    '/typeOfServices/:typeId',
    authUser,
    deleteTypeOfServiceController
);

/*delete servicio '/typeOfServices/:id'*  SOLO ADMIN/
edit servicio '/typeOfServices/edit/:id'* SOLO ADMIN/*/

export default router;
