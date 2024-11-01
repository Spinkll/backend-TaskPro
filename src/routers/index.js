import { Router } from 'express';
import curRouter from './boards.js';
import authRouter from './auth.js';

const router = Router();

router.use('/boards', curRouter);
router.use('/auth', authRouter);

export default router;
