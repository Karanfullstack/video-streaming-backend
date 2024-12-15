import User from "../models/user.model.js";
import HttpError from "../utils/ApiError.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import { generateAccessAndRefreshToken } from "../utils/generateTokens.js";

// @Create User End Point
const registerUser = asynHandler(async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    if ([username, email, firstName, lastName, password].some((value) => value.trim() === "")) {
        throw new HttpError(400, "All fields are required!");
    }

    const isUserExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserExists) {
        if (fs.existsSync(req.files?.avatar[0]?.path)) {
            fs.unlinkSync(req.files?.avatar[0]?.path);
        }
        if (fs.existsSync(req.files?.coverPath[0]?.path)) {
            fs.unlinkSync(req.files?.coverPath[0]?.path);
        }
        throw new HttpError(403, " user is already exists");
    }

    let localCoverPath;
    if (req.files && Array.isArray(req.files.coverPath) && req.files.coverPath.length > 0) {
        localCoverPath = req.files.coverPath[0].path;
    }
    const localAvatarPath = req.files?.avatar[0]?.path;

    if (!localAvatarPath) throw new HttpError(400, "Avatar is required");

    // Upolad to cloudinary

    const avatar = await uploadToCloudinary(localAvatarPath).catch((error) => console.log(error));
    if (!avatar) throw new HttpError(400, "Avatar file is required!!");

    const coverImage = await uploadToCloudinary(localCoverPath).catch((error) =>
        console.log(error),
    );

    // Save user data into database
    const user = await User.create({
        firstName,
        lastName,
        avatar: {
            public_id: avatar.public_id,
            url: avatar.secure_url,
        },
        coverImage: {
            public_id: coverImage?.public_id || "",
            url: coverImage?.secure_url || "",
        },
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

// @Login User End Point
const loginUser = asynHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!(email || username)) {
        throw new HttpError(401, "User or email is required");
    }
    const user = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new HttpError(404, "Email or Usrname is incorrect.");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new HttpError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInuser = await User.findById(user._id).select(" -password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            data: loggedInuser,
            accessToken,
            refreshToken,
        });
});

export { loginUser, registerUser };
