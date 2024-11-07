import { Router } from 'express';
import boardsRouter from './boards.js';
import authRouter from './auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { needHelpMailController } from '../controllers/needHelpMail.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendMailSchema } from '../validation/sendMailValidation.js';
import columnsRouter from './columns.js';
import cardsRouter from './cards.js';


const router = Router();

router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/auth', authRouter);
router.use(
  '/need-help',
  validateBody(sendMailSchema),
  ctrlWrapper(needHelpMailController),
);

export default router;
