const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const tokenRouter = require("./routes/tokenRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/token", tokenRouter);
app.use("/blog", blogRouter);

module.exports = app;
