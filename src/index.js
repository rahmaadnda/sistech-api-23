const app = require("./config");
require("dotenv").config({path: '.env.local'});
const path = process.cwd().toString()

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile("src/pages/index.html", {root: path})
});

app.get("/about", (req, res) => {
  res.sendFile("src/pages/about.html", {root: path})
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
