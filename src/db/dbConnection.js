import mongoose from "mongoose";
const connect = async () => {
    mongoose
        .connect(`${process.env.MONGO_URI}`)
        .then(() => {
            console.log("Databse is connected");
        })
        .catch((error) => {
            console.log("MONGODB connection FAILED ", error);
            process.exit(1);
        });
};

export default connect;
