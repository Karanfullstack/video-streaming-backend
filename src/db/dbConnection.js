import mongoose from "mongoose";
import { CONFIG } from "../config/index.js";
const connect = async () => {
    mongoose
        .connect(`${CONFIG.MONGO_URI}`)
        .then(() => {
            console.log("Databse is connected");
        })
        .catch((error) => {
            console.log("MONGODB connection FAILED ", error);
            process.exit(1);
        });
};

export default connect;
