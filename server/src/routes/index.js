import express from 'express';

import userRouter from './userRouter.js';
import serviciosRouter from './serviciosRouter.js'

const router = express.Router();

router.use(userRouter);
router.use(serviciosRouter);

export default router;
