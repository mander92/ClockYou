import express from "express";

import {
  registerUserController,
  validateUserController,
  loginUserController,
  changeUserPasswordController,
  sendRecoverPassCodeController,
  registerUserEmployeeController,
} from "../controllers/users/index.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/users/register", registerUserController);

router.get("/users/validate/:registrationCode", validateUserController);

router.post("/users/login", loginUserController);

router.patch("/users/password", changeUserPasswordController);

router.post("/users/password/recover", sendRecoverPassCodeController);

router.post(
  "/users/employee/register",
  authUser,
  registerUserEmployeeController
);

/* get('/users/employee' SOLO ADMIN)
    get('/users/employee/:id' SOLO ADMIN) 
create('/users/employee/register

'users/edit/:id'*/

export default router;
