import express from "express";
import { allUsers, signup } from "../controllers/user.controller";
import { login } from "../controllers/user.controller";
import { extractUserInformationn } from "../controllers/user.controller";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/info', extractUserInformationn);
router.get('/all', allUsers);

export default router