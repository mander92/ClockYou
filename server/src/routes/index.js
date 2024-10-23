import express from 'express';

import userRouter from './userRouter.js';
import typeOfServiceRouter from './typeOfServiceRouter.js';
import serviceRouter from './serviceRouter.js';
import shiftRecordRouter from './shiftRecordRouter.js';
import personAssigned from './personAssigned.js';

const router = express.Router();

router.use(userRouter);
router.use(typeOfServiceRouter);
router.use(serviceRouter);
router.use(shiftRecordRouter);
router.use(personAssigned);

export default router;
