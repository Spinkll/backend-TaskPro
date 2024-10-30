import { Router } from 'express';
import boardsRouter from './boards.js';

const router = Router();

router.use('/boards', boardsRouter);

export default router;
