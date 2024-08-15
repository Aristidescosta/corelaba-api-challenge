import { Router } from 'express';
import { NotesController, UserController } from '../controller';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo');
});


//Notes
router.delete('/notes/:id', /* ensureAuthenticated, */ NotesController.deleteByIdValidation, NotesController.deleteById);
router.put('/notes/:id', /* ensureAuthenticated, */ NotesController.updateByIdValidation, NotesController.updateById);
router.post('/notes', /* ensureAuthenticated, */ NotesController.createValidation, NotesController.create);
router.get('/notes/:id', /* ensureAuthenticated, */ NotesController.getByIdValidation, NotesController.getById);
router.get('/notes', /* ensureAuthenticated, */ NotesController.getAllValidation, NotesController.getAll);

//Users
router.post('/signin', UserController.signInValidation, UserController.signIn);
router.post('/signup', UserController.signUpValidation, UserController.signUp);


export { router };