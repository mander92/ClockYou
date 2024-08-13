import express from "express";
import { PORT } from "./env.js";

// Crear la aplicación express
const app = express();

// Middleware parseo del body de la peticion
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
