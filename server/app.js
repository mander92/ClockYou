import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import { PORT } from "./env.js";
// Importamos los controladores de errores
import {
  notFoundController,
  errorController,
} from './src/controllers/errors/index.js';
=======
import { PORT } from './env.js';
>>>>>>> 86a4f4a96bb40f1aaed0e8290ec08c20d2781898

const app = express();

app.use(express.json());

app.use(cors());

<<<<<<< HEAD
// Middleware de Ruta No Encontrada que ejecuta su función controladora
app.use(notFoundController);

// Middleware de Error. No nos lo piden
app.use(errorController);

=======
>>>>>>> 86a4f4a96bb40f1aaed0e8290ec08c20d2781898
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
