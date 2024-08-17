import express from "express";

import {
  registerUserController,
  validateUserController,
  loginUserController,
  changeUserPasswordController,
  sendRecoverPassCodeController,
  registerUserEmployeeController,
  editUserController
} from "../controllers/users/index.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/users/register", registerUserController);

router.get("/users/validate/:registrationCode", validateUserController);

router.post("/users/login", loginUserController);

router.patch("/users/password", changeUserPasswordController);

router.post("/users/password/recover", sendRecoverPassCodeController);

router.post("/users/employee/register", authUser, registerUserEmployeeController);

router.put('/users/:userId', authUser, editUserController)

/* 

GET ('/users/employee/:id' SOLO ADMIN) 
PUT 'users/edit/avatar:id'
PUT 'users/edit/:id'
DELETE(desactivar usuario)

*/

export default router;
