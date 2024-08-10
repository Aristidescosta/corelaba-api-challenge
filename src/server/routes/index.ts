import { Router } from 'express';
import { TasksController } from '../controller';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


//Tasks
router.post('/create-task', TasksController.createValidation, TasksController.create);
router.get('/tasks', TasksController.getAllValidation, TasksController.getAll);


export { router };