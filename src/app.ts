import express, { Application } from 'express';
import cors from "cors";
import Database from './database/config';

//make an instatnce from express app
const app: Application = express();

// allow express to use json formate to deal with request and response
app.use(express.json());

app.use(cors({
    origin: "*",
    allowedHeaders: ["Origin", "X-Request-With", "Content-Type"],
    methods: ["POST", "PATCH", "GET", "OPTIONS"],
    preflightContinue: false,
    maxAge: 60 * 60 * 24 * 365,
    optionsSuccessStatus: 204
}));

// connect to db 
Database.getInstance();

// export app for use
export default app;