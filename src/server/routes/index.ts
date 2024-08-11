import { Router } from 'express';
import { TasksController, UserController } from '../controller';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


//Tasks
router.delete('/tasks/:id', TasksController.deleteByIdValidation, TasksController.deleteById);
router.put('/tasks/:id', TasksController.updateByIdValidation, TasksController.updateById);
router.post('/tasks', TasksController.createValidation, TasksController.create);
router.get('/tasks/:id', TasksController.getByIdValidation, TasksController.getById);
router.get('/tasks', TasksController.getAllValidation, TasksController.getAll);

//Users
router.post('/signin', UserController.signInValidation, UserController.signIn);
router.post('/signup', UserController.signUpValidation, UserController.signUp);


export { router };