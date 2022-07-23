const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const tokenRouter = require("./routes/tokenRoutes");
const blogRouter = require("./routes/blogRoutes");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "what u doin, stop spamming",
});

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(limiter);

app.use("/token", tokenRouter);
app.use("/blog", blogRouter);

module.exports = app;
