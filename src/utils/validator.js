const { checkSchema } = require("express-validator");

const tokenValidationRules = checkSchema({
  name: {
    in: "body",
    errorMessage: "name is a required field",
    exists: true,
  },
});

module.exports = tokenValidationRules;
