import express from 'express';

import userRouter from './userRouter.js';
import typeOfServiceRouter from './typeOfServiceRouter.js';
import servicesRouter from './servicesRouter.js'

const router = express.Router();

router.use(userRouter);
router.use(typeOfServiceRouter);
router.use(servicesRouter)

export default router;
