const { Router } = require("express");
const { OK, BAD_REQUEST } = require("http-status");
const TokenController = require("../controllers/tokenController");
const { tokenValidationRules } = require("../utils/validator");
const { validationResult } = require("express-validator");

const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.post("/", tokenValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: errors.array() });
  }

  const { name } = req.body;

  const data = await tokenController.generateToken({ name });

  return res.status(OK).json(data);
});

module.exports = tokenRouter;
