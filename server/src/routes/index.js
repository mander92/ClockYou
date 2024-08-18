import express from 'express';

import userRouter from './userRouter.js';
import typeOfServiceRouter from './typeOfServiceRouter.js';
import servicesRouter from './servicesRouter.js';
import serviceAssignedRouter from './serviceAssignedRouter.js'

const router = express.Router();

router.use(userRouter);
router.use(typeOfServiceRouter);
router.use(servicesRouter);
router.use(serviceAssignedRouter);

export default router;
