const { checkSchema } = require("express-validator");

const tokenValidationRules = checkSchema({
  name: {
    in: "body",
    errorMessage: "name is a required field",
    exists: true,
  },
});

const createBlogValidationRules = checkSchema({
  title: {
    in: "body",
    errorMessage: "title is a required field",
    exists: true,
  },
  content: {
    in: "body",
    errorMessage: "content is a required field",
    exists: true,
  },
});

module.exports = { tokenValidationRules, createBlogValidationRules };
