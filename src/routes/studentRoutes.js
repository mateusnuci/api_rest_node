import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = new Router();

router.get('/', StudentController.index);




export default router;
