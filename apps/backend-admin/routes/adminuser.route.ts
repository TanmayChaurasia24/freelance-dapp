import express from "express";
import { createAdmin, login } from "../controllers/adminuser.controller";

const router = express.Router();

router.post('/create/yytsjsskuesmxw', createAdmin);
router.post('/login', login);


export default router