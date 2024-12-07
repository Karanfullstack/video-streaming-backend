import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_SECRET: process.env.REFRESH_TOKEN,
    EXPIRY_TIME: process.env.EXPIRY_TIME_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
};
