import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import isEmployee from '../middleware/isEmployee.js';
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
    '/shiftRecords/clockIn',
    authUser,
    isEmployee,
    startShiftRecordsController
);

router.get('/shiftRecords', authUser, isAdmin, listShiftRecordsController);

router.get(
    '/shiftRecords/:shiftRecordId',
    authUser,
    shiftRecordExists,
    detailShiftRecordController
);

router.post(
    '/shiftRecords/:serviceId',
    authUser,
    isAdmin,
    serviceExists,
    newShiftRecordController
);



router.put(
    '/shiftRecords/edit/:shiftRecordId',
    authUser,
    isAdmin,
    shiftRecordExists,
    editShiftRecordController
);

router.patch(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isEmployee,
    shiftRecordExists,
    endShiftRecordsController
);

export default router;
