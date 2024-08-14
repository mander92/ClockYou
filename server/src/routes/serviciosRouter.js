import express from express;

import {
    listServiceController,
    newServiceController,
    deleteServiceController,
} from '../controllers/services/index.js';

import authUser from '../middleware/authUser.js'


const routerService = express.Router();

routerService.post('/services', authUser, newServiceController);

routerService.get('/services', listServiceController);

routerService.delete('/services/:serviceId', deleteServiceController);

export default routerService;