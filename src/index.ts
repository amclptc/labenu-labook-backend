import  express, { Request, Response} from 'express';
import cors from 'cors';
import { TPost, TUser } from './types';
import { posts, users } from './database';

//cria o servidor do express:
const app = express();
//configura o middleware que garante que as respostas estejam sempre me json:
app.use(express.json());
//configura o moddleware que habilita o cors:
app.use(cors());
//faz o servidor rodar na porta 3003:
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


//endpoint de teste:
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

//endpoint signup:
app.post('/users/signup', (req: Request, res: Response) => {
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    const newUser: TUser = {
        name, 
        email,
        password
    }

    users.push(newUser);

    res.status(200).send("Cadastro realizado com sucesso!")
})

//endpoint login:
app.post('/users/login', (req:Request, res:Response) => {
    const email = req.body.email as string;
    const password = req.body.password as string;
})

//endpoint get posts:
app.get('/posts', (req:Request, res:Response) => {
    res.status(200).send(posts);
})

//endpoint create post:
app.post('/posts', (req:Request, res:Response) => {
    const auth = req.headers.authorization as string;
    const content = req.body.content as string;

    const newPost: TPost = {
        content
    }

    posts.push(newPost);

    res.status(200).send("Post criado com sucesso!");
})

//endpoint edit post:
app.put('/posts/:id', (req:Request, res:Response) => {
    const auth = req.headers.authorization as string;
    const content = req.body.content as string;
})

//endpoint delete post:
app.delete('/posts/:id', (req:Request, res:Response) => {
    const auth = req.headers.authorization as string;
})

//endpoint like/dislike post:
app.put('/posts/:id/like', (req:Request, res:Response) => {
    const auth = req.headers.authorization as string;
    const like = req.body.like as boolean;

    if(like){

    }else{
        
    }

})
