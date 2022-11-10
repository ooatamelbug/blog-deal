import { swaggersetting } from "./swagger";
import { appRouter } from "./shared/routes";
import express, { Application } from "express";
import cors from "cors";
import Database from "./database/config";
import swaggerJSD from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

//make an instatnce from express app
const app: Application = express();

// allow express to use json formate to deal with request and response
app.use(express.json());

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Origin", "X-Request-With", "Content-Type", "Authorization"],
    methods: ["POST", "PATCH", "GET", "OPTIONS"],
    preflightContinue: false,
    maxAge: 60 * 60 * 24 * 365,
    optionsSuccessStatus: 204,
  })
);

// connect to db
Database.getInstance();

const specs = swaggerJSD(swaggersetting);
// app routes
appRouter(app);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
// export app for use
export default app;
