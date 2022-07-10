const { Router } = require("express");
const { OK } = require("http-status");
const BlogController = require("../controllers/blogController");
const tokenApiChecker = require("../middlewares/token");
const { createBlogValidationRules } = require("../utils/validator");
const { validationResult } = require("express-validator");

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post(
  "/",
  tokenApiChecker,
  createBlogValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ errors: errors.array() });
    }

    const { title, content, token } = req.body;

    const data = await blogController.createBlog({ title, content, token });

    return res.status(OK).json(data);
  }
);

blogRouter.get("/", tokenApiChecker, async (req, res) => {
  const { token } = req.body;

  const data = await blogController.listBlog({ token });

  return res.status(OK).json(data);
});

module.exports = blogRouter;
