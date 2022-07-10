const { UNAUTHORIZED, BAD_REQUEST } = require("http-status");
const db = require("../database/firestore");

const tokenApiChecker = async (req, res, next) => {
  const tokenDB = db.collection("api_token");
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(UNAUTHORIZED).json({ error: "No header provided" });
  }

  const token = bearer.split(" ")[1];
  const user = await tokenDB.doc(token).get();

  if (!user.exists) {
    return res.status(BAD_REQUEST).json({ error: "No api token found" });
  }

  req.body.token = token;
  next();
};

module.exports = tokenApiChecker;
