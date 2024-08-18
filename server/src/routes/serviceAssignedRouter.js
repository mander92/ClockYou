import express from 'express';

import authUser from '../middleware/authUser.js';

import newServiceAssignedController from '../controllers/serviceAssigned/newServiceAssignedController.js'

const router = express.Router()

router.get('/serviceAssigned', authUser, newServiceAssignedController);

export default router;