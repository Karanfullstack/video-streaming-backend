import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import videoRouter from "./routes/vidoe.routes.js";
import channelRouter from "./routes/user.routes.js";
import cors from "cors";
const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.get("/", (_req, res) => {
    res.send("<h1>Health Check</h1");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", videoRouter);
app.use("/api/v1", channelRouter);

export default app;
