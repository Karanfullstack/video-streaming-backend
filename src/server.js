import app from "./app.js";
import dotenv from "dotenv";
import cors from "cors";

import connect from "./db/dbConnection.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
