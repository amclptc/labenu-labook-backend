"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.post('/users/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        name,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(200).send("Cadastro realizado com sucesso!");
});
app.post('/users/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
});
app.get('/posts', (req, res) => {
    res.status(200).send(database_1.posts);
});
app.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const content = req.body.content;
    const likes = req.body.likes;
    const dislikes = req.body.dislikes;
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;
    const creatorId = req.body.creator.id;
    const creatorName = req.body.creator.name;
    const post = database_1.posts.find((post) => post.id === id);
    if (post) {
        post.id = newId || post.id;
        post.content = content || post.content;
        post.likes = isNaN(likes) ? post.likes : likes;
        post.dislikes = isNaN(dislikes) ? post.dislikes : dislikes;
        post.createdAt = createdAt || post.createdAt;
        post.updatedAt = updatedAt || post.updatedAt;
        post.creator.id = creatorId || post.creator.id;
        post.creator.name = creatorName || post.creator.name;
    }
    res.status(200).send("Atualização realizada com sucesso!");
});
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    const postIndex = database_1.posts.findIndex((post) => post.id === id);
    if (postIndex >= 0) {
        database_1.posts.splice(postIndex, 1);
    }
    res.status(200).send("Post deletado com suceso!");
});
app.put('/posts/:id/like', (req, res) => {
    const auth = req.headers.authorization;
    const like = req.body.like;
    if (like) {
    }
    else {
    }
});
//# sourceMappingURL=index.js.map