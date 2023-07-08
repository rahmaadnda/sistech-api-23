const app = require("./config");
const path = require("path");

require("dotenv").config({path: '.env.local'});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/pages/index.html"))
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/pages/about.html'))
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
