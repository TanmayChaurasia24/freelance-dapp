import express from "express";
import connectdb from "./db";

const app = express();
const port = 3000;

connectdb()

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
