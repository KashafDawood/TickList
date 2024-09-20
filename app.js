/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const taskRouter = require("./routes/taskroute");
const userRouter = require("./routes/userRoute");
const projectRouter = require("./routes/projectRoute");
const notificaitonRouter = require("./routes/notificationRoute");

const app = express();

// set security http methods
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// limit request form same ip
const limit = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from the same ip! Try again after an hour",
});
app.use("/api", limit);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json());
app.use(cookieparser());

// data sanitize for no sql injections
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

// prevent parameter pollution
app.use(hpp());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/notifications", notificaitonRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
