import express from 'express';

import createNewServiceController from '../controllers/services/createNewServiceController.js';

import authUser from '../middleware/authUser.js'
import serviceExist from '../middleware/serviceExist.js';


const routerService = express.Router();

routerService.post('/services/createnew', authUser, serviceExist, createNewServiceController);

export default routerService;