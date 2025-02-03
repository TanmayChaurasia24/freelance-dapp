import express from "express";
import { generateContent } from "../controllers/image.controller";

const router = express.Router();

router.post('/generate', generateContent);

export default router