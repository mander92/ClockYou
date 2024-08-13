//llamar a los dos enrrutados y exporto un solo router que lo voy
//a estar implementando en el server.js
import express from 'express';

import entriesRouter from './entriesRouter.js';
import userRouter from './userRouter.js';

const router = express.Router();

router.use(entriesRouter);
router.use(userRouter);

export default router;