import express from 'express';

import { registerUserController } from '../controllers/users/index.js';


const router = express.Router();

router.post('/users/register', registerUserController);
export default router;
