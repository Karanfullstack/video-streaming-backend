import { asynHandler } from "../utils/asyncHandler";
import HttpError from "../utils/ApiError";
import { uploadToCloudinary } from "../utils/cloudinary";
import { Video } from "../models/video.model";

const uploadVideo = asynHandler(async (req, res) => {
    const { title, description } = req.body;

    if ([title, description].some((field) => field?.trim() === "")) {
        throw new HttpError(400, "All fields are required.");
    }

    const videoFileLocalPath = req.files?.videoFile[0].path;
    const thumbnailLocalPath = req.files?.thumbnail[0].path;

    if (!videoFileLocalPath) {
        throw new HttpError(400, "videoFileLocalPath is required.");
    }
    if (!thumbnailLocalPath) {
        throw new HttpError(400, "thumbnailLocalPath is required.");
    }

    const videoFile = await uploadToCloudinary(videoFileLocalPath);
    const thumbnail = await uploadToCloudinary(thumbnailLocalPath);

    if (!videoFile) {
        throw new HttpError(400, "Video File not found.");
    }

    if (!thumbnail) {
        throw new HttpError(400, "Thumbnail File not found.");
    }
    const video = await Video.create({
        title,
        description,
        duration: videoFile.duration,
        videoFile: {
            url: videoFile.url,
            public_id: videoFile.public_id,
        },
        thumbnail: {
            url: thumbnail.url,
            public_id: thumbnail.public_id,
        },
        owner: req.user?._id,
        isPublished: false,
    });

    const videoUploaded = await Video.findById(video._id);
    if (!videoUploaded) {
        throw new HttpError(500, "Video Upload failed please try again.");
    }
    return res.status(200).json({
        success: true,
        data: videoUploaded,
        message: "Video uploaded successfully",
    });
});

export { uploadVideo };
