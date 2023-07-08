const app = require("./config");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile("pages/index.html", {root: __dirname})
});

app.get("/about", (req, res) => {
  res.sendFile("pages/about.html", {root: __dirname})
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
