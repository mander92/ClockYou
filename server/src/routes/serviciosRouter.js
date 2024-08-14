import express from express;



const routerService = express.Router();

routerService.post('/services', createServiceController);

routerService.get('/services', listServiceController);

routerService.delete('/services/:serviceId', removeServiceController);

export default router;