import express from 'express';
import assignPersonToServiceController from '../controllers/personAsiggned/assingPersonToServiceController.js';
import unassignPersonToServiceControler from '../controllers/personAsiggned/unassignPersonToServiceControler.js'
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.post('/assign/:serviceId', authUser, assignPersonToServiceController);

router.delete('/personsassigned/delete', authUser, unassignPersonToServiceControler)

export default router;
