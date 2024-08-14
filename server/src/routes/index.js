import express from 'express';

import userRouter from './userRouter.js';
import serviciosRouter from './servicesRouter.js'

const router = express.Router();

router.use(userRouter);
router.use(serviciosRouter);

export default router;
