import express from 'express';

import newTypeOfServiceController from '../controllers/services/newTypeOfServiceController.js';
import serviceExist from '../middleware/serviceExist.js';
import authUserAdmin from '../middleware/authUserAdmin.js';


const router = express.Router();

router.post('/services', authUserAdmin, serviceExist, newTypeOfServiceController);

export default router;