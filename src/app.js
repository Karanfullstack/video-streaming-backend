import express from "express";

const app = new express();

app.get("/", (req, res) => {
    res.send("<h1>Health Check</h1");
});

export default app;
