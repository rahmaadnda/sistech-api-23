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

  async updateBlog(data) {
    let blog = await this.blogDB.doc(data.id).get();

    if (!blog.exists) {
      return { error: "no blog found with given id" };
    }

    blog = blog.data();

    if (blog.owner !== data.token) {
      return { error: "you are not allowed to edit other people blogs" };
    }

    let response = {
      title: blog.title,
      content: blog.content,
      like: blog.like,
    };

    if (typeof data.title != "undefined") {
      await this.blogDB.doc(data.id).update({
        title: data.title,
      });

      response.title = data.title;
    }

    if (typeof data.content != "undefined") {
      await this.blogDB.doc(data.id).update({
        content: data.content,
      });

      response.content = data.content;
    }

    return response;
  }

  async likeBlog(data) {
    let blog = await this.blogDB.doc(data.id).get();

    if (!blog.exists) {
      return { error: "no blog found with given id" };
    }

    blog = blog.data();

    let response = {
      title: blog.title,
      content: blog.content,
    };

    await this.blogDB.doc(data.id).update({
      like: blog.like + 1,
    });

    response.like = blog.like + 1;

    return response;
  }
}

module.exports = BlogController;
