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
    try {
        res.send('Pong!')

    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message)
    }
  });

//endpoint signup:
app.post('/users/signup', (req: Request, res: Response) => {
    try {
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;

        const emailExists = users.find((user) => user.email === email);

        if(emailExists){
            res.statusCode = 404;
            throw new Error("Email já cadastrado!");
        }

        const newUser: TUser = {
            name, 
            email,
            password
        }

        users.push(newUser);
    
        res.status(200).send("Cadastro realizado com sucesso!");
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint login:
app.post('/users/login', (req:Request, res:Response) => {
    try {
        const email = req.body.email as string;
        const password = req.body.password as string;

        const emailExists = users.find((user) => user.email === email);

        if(!emailExists){
            res.statusCode = 404;
            throw new Error("Usuário não cadastrado!");
        }

    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint get posts:
app.get('/posts', (req:Request, res:Response) => {
    try {
        res.status(200).send(posts);

    } catch (error: any) {
		console.log(error)
		res.status(400).send(error.message)
    }
});

// endpoint create post:
app.post('/posts', (req:Request, res:Response) => {
    try {
        // const auth = req.headers.authorization as string;

        const id = req.body.id as string;
        const content = req.body.content as string;
        const likes = req.body.likes as number;
        const dislikes = req.body.dislikes as number;
        const createdAt = req.body.createdAt as string;
        const updatedAt = req.body.updatedAt as string;
        const creatorId = req.body.creator.id as string;
        const creatorName = req.body.creator.name as string;

        const idExists = posts.find((post) => post.id === id);

        if(idExists){
			res.status(404)
			throw new Error("Essa ID pertence a outro post!")
        }

        const newPost: TPost = {
            id,
            content,
            likes,
            dislikes,
            createdAt,
            updatedAt,
            creator = {
                creatorId,
                creatorName
            }
        }

        posts.push(newPost);

        res.status(200).send("Post criado com sucesso!");
        
    } catch (error:any) {
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint edit post:
app.put('/posts/:id', (req:Request, res:Response) => {
    try {
        // const auth = req.headers.authorization as string;
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const content = req.body.content as string | undefined;
        const likes = req.body.likes as number;
        const dislikes = req.body.dislikes as number;
        const createdAt = req.body.createdAt as string | undefined;
        const updatedAt = req.body.updatedAt as string | undefined;
        const creatorId = req.body.creator.id as string | undefined;
        const creatorName = req.body.creator.name as string | undefined;

        const post = posts.find((post) => post.id === id);

        if(post){
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
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint delete post:
app.delete('/posts/:id', (req:Request, res:Response) => {
    try {
        // const auth = req.headers.authorization as string;
        const id = req.params.id;

        const postIndex = posts.findIndex((post) => post.id === id);
        
        const postExists = posts.find((post) => post.id === id);
        if(!postExists){
            res.status(404)
			throw new Error("Post não encontrado!")
        }

        if(postIndex>=0){
            posts.splice(postIndex, 1);
        }
        
        res.status(200).send("Post deletado com suceso!");
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint like/dislike post:
app.put('/posts/:id/like', (req:Request, res:Response) => {
    try {
        // const auth = req.headers.authorization as string;
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const content = req.body.content as string | undefined;
        const likes = req.body.likes as number | undefined;
        const dislikes = req.body.dislikes as number | undefined;
        const createdAt = req.body.createdAt as string | undefined;
        const updatedAt = req.body.updatedAt as string | undefined;
        const creatorId = req.body.creator.id as string | undefined;
        const creatorName = req.body.creator.name as string | undefined;

        const post = posts.find((post) => post.id === id);
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});
