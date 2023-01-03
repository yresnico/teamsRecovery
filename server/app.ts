import express from "express";
import morgan from "morgan";
import authRouter from "./src/routes/private/authRouter";
import ordersRouter from "./src/routes/private/ordersRouter";


const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
// ROUTES
app.use('/api/v1/private/auth', authRouter);
app.use('/api/v1/private/orders', ordersRouter)


export default app;
