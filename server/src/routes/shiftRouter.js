import express from 'express';
import authUser from '../middleware/authUser.js';

import {
    insertShiftController,
} from '../controllers/shiftRecords/index.js'

const router = express.Router();

router.post('/shiftRecords', authUser, insertShiftController)

export default router;

/*  

get. 
get/:id
edit.
delete.

*/