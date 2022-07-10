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
  async listBlog(data) {
    const blogs = await this.blogDB.where("owner", "==", data.token).get();

    let response = [];

    blogs.forEach((x) => {
      response.push({
        id: x.id,
        title: x.data().title,
        content: x.data().content,
        like: x.data().like,
      });
    });

    return response;
  }
  async updateBlog(data) {}
  async likeBlog(data) {}
}

module.exports = BlogController;
