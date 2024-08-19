import express from 'express';

import userRouter from './userRouter.js';
import typeOfServiceRouter from './typeOfServiceRouter.js';
import serviceRouter from './serviceRouter.js';
import serviceAssignedRouter from './serviceAssignedRouter.js';
import fileRouter from './fileRouter.js';

const router = express.Router();

router.use(userRouter);
router.use(typeOfServiceRouter);
router.use(serviceRouter);
router.use(serviceAssignedRouter);
router.use(fileRouter);

export default router;
