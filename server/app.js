import express from "express";

import { PORT } from "./env.js";

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
