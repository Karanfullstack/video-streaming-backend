import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// @Register Route
router.post(
    "/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverPath",
            maxCount: 1,
        },
    ]),
    registerUser,
);

// @Login Route
router.get("/login", loginUser);

export default router;
