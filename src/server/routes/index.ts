import { Router } from 'express';
import { TasksController } from '../controller';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


router.post('/create-task', TasksController.create);


export { router };