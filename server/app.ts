import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}



export default app;
