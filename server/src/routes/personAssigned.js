import express from 'express';
import assignPersonToServiceController from '../controllers/personAsiggned/assingPersonToServiceController.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.post('/assign/:serviceId', authUser, assignPersonToServiceController);

export default router;
