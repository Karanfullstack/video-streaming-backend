import express from "express";
import cookieParser from "cookie-parser";
const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.send("<h1>Health Check</h1");
});

export default app;
