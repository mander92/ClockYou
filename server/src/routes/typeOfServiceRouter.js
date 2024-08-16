import express from 'express';

import authUser from '../middleware/authUser.js';

import {
  listAllTypeOfServicesController,
  newTypeOfServiceController,
  listTypeOfServiceController,
  deleteTypeOfServiceController,
  editTypeOfServiceController,
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

router.put('/typeOfServices/:typeId', authUser, editTypeOfServiceController);

export default router;
