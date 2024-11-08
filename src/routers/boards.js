import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import boardsController from '../controllers/boards.js';
import { createBoardSchema, updateBoardSchema } from '../validation/boards.js';
import { isValidId } from '../middlewares/isValidId.js';

const boardsRouter = Router();
boardsRouter.use(authenticate);

boardsRouter.get('/', ctrlWrapper(boardsController.getAllBoards));
boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(boardsController.createBoard),
);

boardsRouter.get(
  '/:boardId',
  isValidId('boardId'),
  ctrlWrapper(boardsController.getByIdBoard),
);
boardsRouter.patch(
  '/:boardId',
  isValidId('boardId'),
  validateBody(updateBoardSchema),
  ctrlWrapper(boardsController.updateBoard),
);
boardsRouter.delete(
  '/:boardId',
  isValidId('boardId'),
  ctrlWrapper(boardsController.deleteBoard),
);

export default boardsRouter;
