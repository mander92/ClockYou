import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import userExists from '../middleware/userExists.js';

import {
    registerUserController,
    validateUserController,
    loginUserController,
    changeUserPasswordController,
    sendRecoverPasswordCodeController,
    registerUserAdminController,
    editUserController,
    getEmployeeController,
    listUsersController,
    deleteUserController,
    editUserAvatarController,
    editUserPasswordController,
    getUserProfileController,
} from '../controllers/users/index.js';

const router = express.Router();

router.get('/users/validate/:registrationCode', validateUserController);

router.get('/users', authUser, isAdmin, listUsersController);

router.get('/user', authUser, getUserProfileController);

router.get(
    '/users/employee/:employeeId',
    authUser,
    isAdmin,
    userExists,
    getEmployeeController
);

router.post('/users/register', registerUserController);

router.post('/users/login', loginUserController);

router.post('/users/password/recover', sendRecoverPasswordCodeController);

router.post(
    '/users/admin/register',
    authUser,
    isAdmin,
    registerUserAdminController
);

router.post(
    '/users/avatar/:userId',
    authUser,
    userExists,
    editUserAvatarController
);

router.put('/users/:userId', authUser, userExists, editUserController);

router.put(
    '/users/password/:userId',
    authUser,
    userExists,
    editUserPasswordController
);

router.patch('/users/password', changeUserPasswordController);

router.delete('/users/:userId', authUser, userExists, deleteUserController);

export default router;
