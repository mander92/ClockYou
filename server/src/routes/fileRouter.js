import express from 'express';

import authUser from '../middleware/authUser.js';

import fileController from '../controllers/file/fileController.js';

import { UPLOADS_DIR } from '../../env.js';

import multer from "multer";

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./${UPLOADS_DIR}/`)
      },
      filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + file.originalname)
      }
    })

    const upload = multer({ storage: storage });


const router = express.Router()

router.post('/file', authUser, upload.single("sampleFile"), fileController);

export default router;