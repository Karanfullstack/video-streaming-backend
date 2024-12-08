import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CONFIG } from "../config/index.js";

const uploadToCloudinary = async (localpath) => {
    if (!localpath) {
        return null;
    }
    cloudinary.config({
        cloud_name: CONFIG.CLOUDINARY_NAME,
        api_key: CONFIG.CLOUDINARY_API_KEY,
        api_secret: CONFIG.CLOUDINARY_SECRET,
    });

    try {
        const result = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
            folder: "avatar",
        });
        console.log(result);
        fs.unlinkSync(localpath);
        return result;
    } catch (error) {
        if (fs.existsSync(localpath)) fs.unlinkSync(localpath);
        throw error;
    } finally {
        if (fs.existsSync(localpath)) fs.unlinkSync(localpath);
    }
};

export { uploadToCloudinary };
