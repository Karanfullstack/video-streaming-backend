import { CONFIG } from "../config/index.js";
import User from "../models/user.model.js";
import HttpError from "../utils/ApiError.js";
import { asynHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";

const authenticate = asynHandler(async (req, _, next) => {
    const accessToken =
        req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
        throw new HttpError(401, "Unauthorized");
    }
    const decodedToken = JWT.verify(accessToken, CONFIG.ACCESS_SECRET);
    const user = await User.findById(decodedToken._id).select(" -password -refreshToken");

    if (!user) {
        throw new HttpError("401", "Invalid access token");
    }
    req.user = user;
    next();
});

export { authenticate };
