import { asynHandler } from "../utils/asyncHandler.js";
import HttpError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const getCannel = asynHandler(async (req, res) => {
    const { username } = req.params;
    if (!username.trim()) {
        throw new HttpError(400, "channel name is missing.");
    }
    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            },
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribed",
            },
        },
        {
            $addFields: {
                subscriberCount: {
                    $size: "$subscribers",
                },
                subscribedCount: {
                    $size: "$subscribed",
                },
                fullName: {
                    $concat: ["$firstName", " ", "$lastName"],
                },
                isFollow: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscriberCount: 1,
                subscribedCount: 1,
                isFollow: 1,
            },
        },
    ]);
    if (!channel?.length) {
        throw new HttpError(404, "channel doesn not exist");
    }

    return res.status(200).json({ success: true, data: channel[0] });
});

export { getCannel };
