import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

import { PORT, UPLOADS_DIR } from './env.js';

import routes from './src/routes/index.js';

import {
    notFoundErrorController,
    errorController,
} from './src/controllers/errors/index.js';

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.static(UPLOADS_DIR));

app.use(express.json());

app.use(fileUpload());

app.use(routes);

app.use(notFoundErrorController);

app.use(errorController);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
