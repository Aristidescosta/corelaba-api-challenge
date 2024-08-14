import { Router } from 'express';
import { TasksController, UserController } from '../controller';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


//Tasks
router.delete('/tasks/:id', /* ensureAuthenticated, */ TasksController.deleteByIdValidation, TasksController.deleteById);
router.put('/tasks/:id', /* ensureAuthenticated, */ TasksController.updateByIdValidation, TasksController.updateById);
router.post('/tasks', /* ensureAuthenticated, */ TasksController.createValidation, TasksController.create);
router.get('/tasks/:id', /* ensureAuthenticated, */ TasksController.getByIdValidation, TasksController.getById);
router.get('/tasks', /* ensureAuthenticated, */ TasksController.getAllValidation, TasksController.getAll);

//Users
router.post('/signin', UserController.signInValidation, UserController.signIn);
router.post('/signup', UserController.signUpValidation, UserController.signUp);


export { router };