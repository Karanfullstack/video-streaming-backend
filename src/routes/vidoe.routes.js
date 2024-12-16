import { Router } from "express";
import { uploadVideo } from "../controllers/video.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router()

router.post(
    "/upload-video",
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    uploadVideo,
);
export default router;
