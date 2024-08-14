import express from 'express';

import createNewServiceController from '../controllers/services/createNewServiceController.js';

import authUser from '../middleware/authUser.js'
import serviceExist from '../middleware/serviceExist.js';


const router = express.Router();
router.get('/services')
router.post('/services', authUser, serviceExist, createNewServiceController);

export default router;