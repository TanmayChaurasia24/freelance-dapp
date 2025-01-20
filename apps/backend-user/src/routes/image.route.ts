import express from "express";
import { completeWithAI } from "../controllers/image.controller";

const router = express.Router();

router.post('/generate', completeWithAI);

export default router