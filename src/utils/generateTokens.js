import User from "../models/user.model.js";
import HttpError from "./ApiError.js";

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new HttpError(500, "Error while generating refresh and access token.");
    }
};

export { generateAccessAndRefreshToken };
