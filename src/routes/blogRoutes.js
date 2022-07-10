const { Router } = require("express");
const { OK, BAD_REQUEST } = require("http-status");
const BlogController = require("../controllers/blogController");
const tokenApiChecker = require("../middlewares/token");
const {
  createBlogValidationRules,
  editBlogValidationRules,
} = require("../utils/validator");
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

blogRouter.put(
  "/",
  tokenApiChecker,
  editBlogValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ errors: errors.array() });
    }

    const { title, content, token, id } = req.body;

    const data = await blogController.updateBlog({ title, content, token, id });

    return res.status(OK).json(data);
  }
);

blogRouter.post("/like", async (req, res) => {
  const { id } = req.body;

  const data = await blogController.likeBlog({ id });

  return res.status(OK).json(data);
});

module.exports = blogRouter;
