const app = require("./config");
const path = require("path");
const express = require('express');
const tokenRoutes = require('./routes/tokenRoutes')
const blogRoutes = require('./routes/blogRoutes')

require("dotenv").config({path: '.env.local'});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/pages/base.html"))
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/pages/about.html'))
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/pages/home.html'))
});

app.use('/static', express.static(path.join(process.cwd(), 'src/static')));

app.get("/image", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/image.png'))
});

app.use("/token", tokenRoutes);

app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
