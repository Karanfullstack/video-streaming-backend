import User from "../models/user.model.js";
import HttpError from "../utils/ApiError.js";
import { asynHandler } from "../utils/asyncHandler.js";

const registerUser = asynHandler(async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    if (
        [username, email, firstName, lastName, password].some(
            (value) => value?.tirm() === "",
        )
    ) {
        throw new HttpError(400, "All fields are required!");
    }

    const isUserExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    // FIXME: MAKE SEPERATE CONDITION ERROR FOR BOTH EMAIL AND USERNAME
    if (isUserExists) throw new HttpError(403, " user is already exists");
});
