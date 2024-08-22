import express from 'express';
import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import shiftRecordExists from '../middleware/shiftRecordExists.js';

import {
    newShiftRecordController,
    listShiftRecordsController,
    editShiftRecordController,
    detailShiftRecordController
} from '../controllers/shiftRecords/index.js';

const router = express.Router();

router.post('/shiftRecords', authUser, isAdmin, newShiftRecordController);

router.get('/shiftRecords', authUser, isAdmin, listShiftRecordsController);

router.get('/shiftRecords/:shiftRecordId',authUser, isAdmin, shiftRecordExists, detailShiftRecordController);


router.put(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isAdmin,
    shiftRecordExists,
    editShiftRecordController
);

export default router;

