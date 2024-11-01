import { Router } from 'express';
import boardsRouter from './boards.js';
import authRouter from './auth.js';

const router = Router();

router.use('/boards', boardsRouter);
router.use('/auth', authRouter);

export default router;
