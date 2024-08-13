import express from 'express';
import cors from 'cors';
import { PORT } from './env.js';

import {
    notFoundController,
    errorController,
} from './src/controllers/errors/index.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use(notFoundController);

app.use(errorController);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
