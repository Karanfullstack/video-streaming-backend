import { Router } from "express";
import { loginUser, logoutUser, registerUser, self } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authenticate } from "../middlewares/authenticate.js";

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
  registerUser
);

// @Login Route
router.get("/login", loginUser);

// @Self Route
router.get("/self", authenticate,self);


// @Logout  Route
router.post("/logout", authenticate,logoutUser);


export default router;
