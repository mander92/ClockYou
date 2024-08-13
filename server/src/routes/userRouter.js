import express from 'express';

import { registerUserController } from '../controllers/users/index.js';

// import authUser from '../middleware/authUser.js';
// import userExists from '../middleware/userExists.js'

const router = express.Router();
router.post('/users/register', registerUserController);
export default router;
