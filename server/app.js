import express from 'express';
import cors from 'cors';
import { PORT } from './env.js';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
