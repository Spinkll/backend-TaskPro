import { Router } from 'express';
import boardsRouter from './boards.js';
import authRouter from './auth.js';
import columnsRouter from './columns.js';
import cardsRouter from './cards.js';

const router = Router();

router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/auth', authRouter);

export default router;
