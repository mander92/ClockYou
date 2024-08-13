import express from "express";
import cors from 'cors';
import { PORT } from "./env.js";
// Importamos los controladores de errores
import {
  notFoundController,
  errorController,
} from './src/controllers/errors/index.js';

// Crear la aplicación express
const app = express();

// Middleware parseo del body de la peticion
app.use(express.json());
app.use(cors());

// Middleware de Ruta No Encontrada que ejecuta su función controladora
app.use(notFoundController);

// Middleware de Error. No nos lo piden
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
