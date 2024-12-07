import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (_req, res) => {
    res.send("<h1>Health Check</h1");
});

app.use("/api/v1", userRouter);

export default app;
