import express from 'express';
import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import IsEmployee from '../middleware/isEmployee.js';
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
import isEmployee from '../middleware/isEmployee.js';

const router = express.Router();

router.get('/shiftRecords', authUser, isAdmin, listShiftRecordsController);

router.get(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isAdmin,
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

router.post(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isEmployee,
    shiftRecordExists,
    startShiftRecordsController
);

// router.post(
//     '/shiftRecords/:employeeId/end',
//     authUser,
//     shiftRecordExists,
//     endShiftRecordsController
// );

router.put(
    '/shiftRecords/:shiftRecordId',
    authUser,
    isAdmin,
    shiftRecordExists,
    editShiftRecordController
);

export default router;
