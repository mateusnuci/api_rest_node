import { Router } from 'express';
import StudentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', StudentController.index);
router.post('/', loginRequired, StudentController.store);
router.get('/:id', StudentController.show)
router.put('/:id', loginRequired, StudentController.update)
router.delete('/:id', loginRequired, StudentController.delete)


export default router;
