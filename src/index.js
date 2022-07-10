const express = require("express");

app = express();

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running`);
});
