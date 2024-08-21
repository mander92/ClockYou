import express from "express";
import authUser from "../middleware/authUser.js";

import {
  newShiftController,
  listShiftRecordsController,
  editShiftController,
} from "../controllers/shiftRecords/index.js";

const router = express.Router();

router.post("/shiftRecords", authUser, newShiftController);

router.get("/shiftRecords", authUser, listShiftRecordsController);

router.post("/shiftRecords/:id", authUser, editShiftController);

export default router;

/*  

get. 
get/:id
edit.
delete.

*/
