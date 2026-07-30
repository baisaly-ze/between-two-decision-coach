import { Router } from 'express';
import { getQuestions, decide } from '../controllers/decisionController.js';


const router = Router();
router.post('/questions', getQuestions);
router.post('/decide', decide);
export default router;
