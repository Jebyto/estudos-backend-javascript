const postModel = require("../models/postModel");

const adminController = {
    index(req, res){
        const posts = postModel.getAllPosts();

        res.render('admin', {posts});
    },
    create(req, res){
        res.render('newPostForm');
    },
    save(req, res){
        const { title, content } = req.body;
        const newPost = postModel.createPost(title, content);

        postModel.savePost(newPost);

        res.redirect('/admin');
    },
    delete(req, res){
        const id = req.params.id;

        postModel.deletePost(id);

        res.redirect('/admin');
    },
    edit(req, res) {
        const id = req.params.id;
        const post = postModel.getPostById(id);

        res.render('editPostForm', {post});
    },
    update(req, res) {
        const id = req.params.id;
        const { title, content} = req.body;

        postModel.updatePost(id, { title, content});

        res.redirect('/admin');
    }
}

module.exports = adminController;