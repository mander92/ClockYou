import express from 'express';

import authUser from '../middleware/authUser.js';
import userExists from '../middleware/userExists.js';
import {
    registerUserController,
    validateUserController,
    loginUserController,
    changeUserPasswordController,
    sendRecoverPasswordCodeController,
    registerUserEmployeeController,
    registerUserAdminController,
    editUserController,
    getEmployeeController,
    listEmployeeController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);
router.post('/users/admin/register', authUser, registerUserAdminController);
router.post('/users/login', loginUserController);
router.post('/users/password/recover', sendRecoverPasswordCodeController);
router.post(
    '/users/employee/register',
    authUser,
    registerUserEmployeeController
);

router.get('/users/validate/:registrationCode', validateUserController);
router.get('/users/employee', authUser, listEmployeeController);
router.get(
    '/users/employee/:employeeId',
    authUser,
    userExists,
    getEmployeeController
);

router.put('/users/:userId', authUser, userExists, editUserController);

router.patch('/users/password', changeUserPasswordController);
/* 

PUT 'users/edit/avatar:id'
DELETE(desactivar usuario)

*/

export default router;
