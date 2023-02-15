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
//# sourceMappingURL=index.js.map