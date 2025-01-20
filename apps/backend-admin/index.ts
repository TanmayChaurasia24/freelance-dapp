import express from "express";
import connectdb from "./db";
import cors from "cors";
import adminroute from "./routes/adminuser.route"

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
}));

connectdb();

app.use('/api/admin', adminroute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});