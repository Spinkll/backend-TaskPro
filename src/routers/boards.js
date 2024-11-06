import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createBoardSchema } from '../validation/boarders.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createBoardController,
  getBoardsController,
} from '../controllers/boards.js';

const boardsRouter = Router();

boardsRouter.get('/', getBoardsController);

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);

export default boardsRouter;
