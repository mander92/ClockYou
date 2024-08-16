import express from 'express';

import authUser from '../middleware/authUser.js';
import newServiceController from '../controllers/services/newServiceController.js';

const router = express.Router();

router.post('/services/:typeOfServiceId', authUser, newServiceController);

export default router;
