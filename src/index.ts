import  express, { Request, Response} from 'express';
import cors from 'cors';
import { TPost, TUser } from './types';
import { posts, users } from './database';
import { db } from "./database/knex";

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
app.get('/ping', async (req: Request, res: Response) => {
    try {
        res.send('Pong!')

    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message)
    }
  });

//endpoint signup:
app.post('/users/signup', async (req: Request, res: Response) => {
    try {
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;

        const emailExists = await db("users").where({email: email});

        if(emailExists){
            res.statusCode = 404;
            throw new Error("Email já cadastrado!");
        }

        const newUser: TUser = {
            name, 
            email,
            password
        }

        await db("users").insert(newUser);
    
        res.status(200).send({message: "Cadastro realizado com sucesso!"});
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint login:
app.post('/users/login', async (req:Request, res:Response) => {
    try {
        const email = req.body.email as string;
        const password = req.body.password as string;

        const emailExists = await db("users").where({email: email});

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
app.get('/posts', async (req:Request, res:Response) => {
    try {
        const result = await db("posts");

        res.status(200).send(result);

    } catch (error: any) {
		console.log(error)
		res.status(400).send(error.message)
    }
});

// endpoint create post:
app.post('/posts', async (req:Request, res:Response) => {
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

        const idExists = await db("posts").where({id: id});

        if(idExists){
			res.status(404)
			throw new Error("Essa ID pertence a outro post!");
        };

        if(!id || !content){
            res.status(404)
			throw new Error("Post incompleto!");
        };

        const newPost = {
            id: id,
            content: content,
            likes: likes,
            dislikes: dislikes,
            createdAt: createdAt,
            updatedAt: updatedAt,
            creator = {
                id: creatorId,
                name: creatorName
            }
        }

        await db("users").insert(newPost);
        
        res.status(200).send({message: "Post criado com sucesso!"});
        
    } catch (error:any) {
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint edit post:
app.put('/posts/:id', async (req:Request, res:Response) => {
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

        const post = await db("posts").where({id: id});

        if(post){
            const updatedPost = {
                id: newId || post.id,
                content: content || post.content,
                likes: likes || post.likes,
                dislikes: dislikes || post.dislikes,
                createdAt: createdAt || post.createdAt,
                updatedAt: updatedAt || post.updatedAt,
                creatorId: creatorId || post.creatorId,
                creatorName: creatorName || post.creatorName
            };

            await db("posts").update(updatedPost).where({id: id});

        } else {
            res.status(404)
            throw new Error("ID não encontrada!");
        };

        res.status(200).send({message: "Atualização realizada com sucesso!"});
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint delete post:
app.delete('/posts/:id', async (req:Request, res:Response) => {
    try {
        // const auth = req.headers.authorization as string;
        const id = req.params.id;
        
        const postExists = await db("posts").where({id: id});

        if(!postExists){
            res.status(404)
			throw new Error("Post não encontrado!")
        }

        await db("posts").del().where({id: id});
        
        res.status(200).send({message: "Post deletado com suceso!"});
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});

//endpoint like/dislike post:
app.put('/posts/:id/like', async (req:Request, res:Response) => {
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

        const post = await db("posts").where({id: id});

        if(post){
            await db.raw(`
                UPDATE posts
                SET 
                    id = "${newId || post.id}",
                    content = "${content || post.content}",
                    likes = "${likes || post.likes}",
                    dislikes = "${dislikes || post.dislikes}",
                    createdAt = "${createdAt || post.createdAt}",
                    updatedAt = "${updatedAt || post.updatedAt}",
                    creatorId = "${creatorId || post.creatorId}",
                    creatorName = "${creatorName || post.creatorName}"
                WHERE
                    id = "${id}";
            `)
        }
        
    } catch (error:any) {
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message);
    }
});
