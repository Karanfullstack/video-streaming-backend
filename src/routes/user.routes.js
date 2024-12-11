import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
    "/register",
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1,
    //     },
    //     {
    //         name: "coverPath",
    //         maxCount: 1,
    //     },
    // ]),
    registerUser,
);

export default router;
