import { Router } from "express";
import { getCannel } from "../controllers/user.controller.js";
const router = Router();

router.get("/get-channel/:username", getCannel);
export default router;
