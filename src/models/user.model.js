import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { CONFIG } from "../config/index.js";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true,
        },
        avatar: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        watchHistory: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    return next();
});

userSchema.methods = {
    comparePassword: async function (plainTextPassword) {
        return await bcryptjs.compare(plainTextPassword, this.password);
    },
    generateAccessToken: function () {
        const payload = {
            _id: this._id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
        };
        return jwt.sign(payload, CONFIG.ACCESS_SECRET, { expiresIn: CONFIG.EXPIRY_TIME });
    },
    generateRefreshToken: function () {
        return jwt.sign({ _id: this._id }, CONFIG.REFRESH_SECRET, {
            expiresIn: CONFIG.EXPIRY_TIME,
        });
    },
};
const User = model("User", userSchema);
export default User;
