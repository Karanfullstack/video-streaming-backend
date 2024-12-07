import User from "../models/user.model.js";
import HttpError from "../utils/ApiError.js";
import { asynHandler } from "../utils/asyncHandler.js";

export const registerUser = asynHandler(async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    if (
        [username, email, firstName, lastName, password].some(
            (value) => value.trim() === "",
        )
    ) {
        throw new HttpError(400, "All fields are required!");
    }

    const isUserExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    // FIXME: MAKE SEPERATE CONDITION ERROR FOR BOTH EMAIL AND USERNAME
    if (isUserExists) throw new HttpError(403, " user is already exists");

    let localCoverPath;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        localCoverPath = req.files.coverImage[0].path;
    }
    const localAvatarPath = req.files?.avatar[0].path;

    if (!localAvatarPath) throw new HttpError(400, "Avatar is required");

    // TODO: UPLOAD TO CLOUDINARY OR AWS S3 BUCKET

    // Save user data into database
    const user = await User.create({
        firstName,
        lastName,
        avatar: localAvatarPath,
        coverImage: localCoverPath ? localCoverPath : undefined,
        email,
        username: username.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken -__v");

    if (!createdUser) throw new HttpError(500, "User registration failed");

    return res.status(201).json({
        success: true,
        data: createdUser,
        message: "user registred successfully",
    });
});
