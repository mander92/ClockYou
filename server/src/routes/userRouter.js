import express from 'express';

import {
    registerUserController,
    validateUserController,
    loginUserController,
    changeUserPasswordController,
    sendRecoverPasswordCodeController,
    registerUserEmployeeController,
    registerUserAdminController,
    editUserController,
} from '../controllers/users/index.js';
import authUser from '../middleware/authUser.js';

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

router.patch('/users/password', changeUserPasswordController);

router.put('/users/:userId', authUser, editUserController);

/* 

GET ('/users/employee/:id' SOLO ADMIN) 
PUT 'users/edit/avatar:id'
DELETE(desactivar usuario)

*/

export default router;
