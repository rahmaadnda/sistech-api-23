const express = require("express");
require("dotenv").config();

app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
