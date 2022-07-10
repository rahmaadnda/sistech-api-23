const db = require("../database/firestore");
const { v4 } = require("uuid");

class BlogController {
  blogDB = db.collection("blog");

  async createBlog(data) {
    const token = v4();

    await this.blogDB.doc(token).set({
      title: data.title,
      content: data.content,
      like: 0,
      owner: data.token,
    });

    return {
      id: token,
      title: data.title,
      content: data.content,
      like: 0,
      owner: data.token,
    };
  }
  async listBlog(data) {}
  async updateBlog(data) {}
  async likeBlog(data) {}
}

module.exports = BlogController;
