import  express, { Request, Response} from 'express';
import cors from 'cors';

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

