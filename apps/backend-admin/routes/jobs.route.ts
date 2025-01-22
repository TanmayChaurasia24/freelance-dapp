import express from "express";
import { jobpost, showjobs } from "../controllers/jobpost.controller";

const router = express.Router();

router.post('/create', jobpost);
router.get('/showall', showjobs);


export default router