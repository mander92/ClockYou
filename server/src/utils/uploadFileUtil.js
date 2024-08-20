import multer from "multer";
import fs from 'fs';
import { UPLOADS_DIR } from '../../env.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = `./${UPLOADS_DIR}/`;

    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;