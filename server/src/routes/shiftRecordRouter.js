import express from 'express';
import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import serviceExists from '../middleware/serviceExists.js';
import shiftRecordExists from '../middleware/shiftRecordExists.js';

import {
    newShiftRecordController,
    listShiftRecordsController,
    editShiftRecordController,
    detailShiftRecordController,
    startShiftRecordsController,
    endShiftRecordsController,
} from '../controllers/shiftRecords/index.js';

const router = express.Router();

router.post(
    '/shiftRecords/:serviceId',
    authUser,
    isAdmin,
    serviceExists,
    newShiftRecordController
);

router.get('/shiftRecords', authUser, isAdmin, listShiftRecordsController);

router.get(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isAdmin,
    shiftRecordExists,
    detailShiftRecordController
);

router.put(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isAdmin,
    shiftRecordExists,
    editShiftRecordController
);

router.post('/shiftRecords/:employeeId/start', authUser, startShiftRecordsController);
router.post('/shiftRecords/:employeeId/end', authUser, shiftRecordExists, endShiftRecordsController);

export default router;
