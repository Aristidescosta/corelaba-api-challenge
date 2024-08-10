import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


router.post('/create-task', (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.UNAUTHORIZED).json('Rota de criação de tarefas');
});


export { router };