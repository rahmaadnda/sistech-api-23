const { Router } = require("express");
const { OK } = require("http-status");
const BlogController = require("../controllers/blogController");
const tokenApiChecker = require("../middlewares/token");

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post("/", tokenApiChecker, async (req, res) => {
  const { title, content, token } = req.body;

  const data = await blogController.createBlog({ title, content, token });

  return res.status(OK).json(data);
});

module.exports = blogRouter;
