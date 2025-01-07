import express from "express";
import connectdb from "./db";
import user from "./routes/user.route";
import cors from "cors";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
}));

connectdb();

app.use("/api/auth", user);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
