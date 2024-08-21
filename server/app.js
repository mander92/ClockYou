import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { PORT } from './env.js';

import {
    notFoundErrorController,
    errorController,
} from './src/controllers/errors/index.js';

import routes from './src/routes/index.js';

const app = express();

app.use(express.json());

app.use(fileUpload())

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes)

app.use(notFoundErrorController);

app.use(errorController);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
