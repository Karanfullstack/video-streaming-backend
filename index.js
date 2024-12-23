import app from "./src/app.js";
import dotenv from "dotenv";
import connect from "./src/db/dbConnection.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});
