import express from 'express';

import {
    registerUserController,
    validateUserController,
    loginUserController,
    changeUserPasswordController,
    sendRecoverPassCodeController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);

router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.patch('/users/password', changeUserPasswordController);

router.post('/users/password/recover', sendRecoverPassCodeController);

/* get('/users/employee' SOLO ADMIN)
    get('/users/employee/:id' SOLO ADMIN) 
    create('/users/employee/register' SOLO ADMIN) 

'users/edit/:id'*/

export default router;
