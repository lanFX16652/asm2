import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import { authenticateRouter } from "./routers/auth.js";
import hotelWebRoute from "./routers/hotel.js";
import roomWebRoute from "./routers/room.js";
import transactionRoute from "./routers/transaction.js";

// import
import mongodbSession from "connect-mongodb-session";
const MongoDBStore = mongodbSession(session);

// required
// const MongoDBStore = require("connect-mongodb-session");
// MongoDBStore(session)

const MONGODB_URI = "mongodb://127.0.0.1:27017/asm2";
dotenv.config();
const app = express();
const port = 5000;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//sử dụng session để kiểm tra login
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(transactionRoute);

// authenticate route
app.use(authenticateRouter);

//init web routes
hotelWebRoute(app);
roomWebRoute(app);

//Database Connect
mongoose
  .connect(MONGODB_URI)
  .then((result) => console.log("Database Connection Success"))
  .catch((err) => console.log("Database Connection Failed"));

app.listen(port, () => {
  console.log(`Connected with port: ${port}`);
});
