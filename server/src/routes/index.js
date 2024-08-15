import express from 'express';

import userRouter from './userRouter.js';
import typeOfServiceRouter from './typeOfServiceRouter.js'

const router = express.Router();

router.use(userRouter);
router.use(typeOfServiceRouter);

export default router;
