import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createBoardSchema } from '../validation/boardsValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createBoardController,
  createCardController,
  createColumnController,
  deleteBoardController,
  deleteCardController,
  deleteColumnController,
  getBoardsController,
  getCardsController,
  getColumnsController,
  updateBoardController,
  updateCardController,
  updateColumnController,
} from '../controllers/boards.js';
import { createColumnsSchema } from '../validation/columnValidation.js';
import { createCardSchema } from '../validation/cardValidation.js';

const boardsRouter = Router();

boardsRouter.get('/:boardId', ctrlWrapper(getBoardsController));
boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);
boardsRouter.patch(
  '/:boardId',
  validateBody(createBoardSchema),
  ctrlWrapper(updateBoardController),
);
boardsRouter.delete('/:boardId', ctrlWrapper(deleteBoardController));

boardsRouter.get('/column/:columnId', ctrlWrapper(getColumnsController));
boardsRouter.post(
  '/column',
  validateBody(createColumnsSchema),
  ctrlWrapper(createColumnController),
);
boardsRouter.patch(
  '/column/:columnId',
  validateBody(createColumnsSchema),
  ctrlWrapper(updateColumnController),
);
boardsRouter.delete('/column/:columnId', ctrlWrapper(deleteColumnController));

boardsRouter.get('/card/:cardId', ctrlWrapper(getCardsController));
boardsRouter.post(
  '/card',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);
boardsRouter.patch(
  '/card/:cardId',
  validateBody(createCardSchema),
  ctrlWrapper(updateCardController),
);
boardsRouter.delete('/card/:cardId', ctrlWrapper(deleteCardController));

export default boardsRouter;
