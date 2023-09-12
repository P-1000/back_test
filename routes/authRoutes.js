import express from "express";
import { login , verify} from "../Controllers/AuthControllers.js";
import {verifyToken} from "../middleware/AuthVerify.js";

const router = express.Router();

// router.post("/signup", signup);
router.post("/login", login);
router.get('/verify' ,  verifyToken  , verify)

export default router