import express from 'express';
import authUser from '../middleware/authUser.js';
import shiftRecordExists from '../middleware/shiftRecordExists.js';

import {
    newShiftRecordController,
    listShiftRecordsController,
    editShiftRecordController,
} from '../controllers/shiftRecords/index.js';

const router = express.Router();

router.post('/shiftRecords', authUser, newShiftRecordController);

router.get('/shiftRecords', authUser, listShiftRecordsController);

router.put(
    '/shiftRecords/:shiftRecordId',
    authUser,
    shiftRecordExists,
    editShiftRecordController
);

export default router;

/*  

get. 
get/:id
edit.
delete.

*/
