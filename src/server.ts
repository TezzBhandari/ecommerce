import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import "express-async-errors";

// import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./db/db";
import { errorHandler, notFoundError } from "./lib/middlewares/errorHandler";
import HttpStatusCodes from "./constants/HTTPStatusCode";
import routes from "./routes";
import { auth } from "./modules/auth/middlewares/auth";

// setting up the express app
const app = express();
const server = http.createServer(app);

// connecting to database & starting server
const start = async () => {
  try {
    const conn = await connectDB();
    console.log(
      `Connected to the Database: ${conn.connection.host}:${conn.connection.port}`
    );
    server.listen(process.env.PORT || 7000, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();

// setting up middlewares
app.use(cors());
// logging the request
app.use(morgan("dev"));

// adds securites to the server
app.use(helmet());
// app.use(xss());
app.use(mongoSanitize());

// parses the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res, next) => {
  res.status(HttpStatusCodes.OK).json({
    status: "success",
    messsage: "welcome to ecommerce backend",
  });
});

app.get("/protected", auth, (req, res, next) => {
  res.status(HttpStatusCodes.OK).json({
    status: "success",
    message: "protected resource",
  });
});

app.use("/api/v1", routes);

// 404 Error
app.use(notFoundError);

// Custom Error Handler
app.use(errorHandler);
