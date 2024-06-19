class Post{
    id;
    title;
    content;
    createdAt;
    updatedAt;

    constructor(id, title, content, createdAt, updatedAt){
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

let posts = [new Post('1', 'Teste 1', 'Lorem ipsum is amet', new Date(), new Date())];

const postModel = {
    getAllPosts(){
        return posts;
    },
    getPostById(id){
        return posts.find(item => item.id === id);
    },
    createPost(title, content){
        const post = new Post(
            Date.now.toString(),
            title,
            content,
            new Date(),
            new Date()
        )

        return post;
    },
    savePost(item){
        posts.push(item);
    },
    updatePost(id, updatedPost){
        const index = posts.findIndex(post => post.id === id);
        posts[index] = {...posts[index], ...updatedPost, updatedAt: new Date() };
    },
    deletePost(id){
        posts = posts.filter(post => post.id !== id);
    }
}

module.exports = postModel;