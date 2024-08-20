import express from 'express';
import authUser from '../middleware/authUser.js';
import fileController from '../controllers/file/fileController.js';
import upload from '../utils/uploadFileUtil.js';  

const router = express.Router();

router.post('/file', authUser, upload.single("sampleFile"), fileController);

export default router;