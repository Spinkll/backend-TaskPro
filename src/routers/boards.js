import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidIds } from '../validation/isValidIds.js';
import boardsController from '../controllers/boards.js';
import columnsController from '../controllers/columns.js';
import cardsController from '../controllers/cards.js';

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.get('/', ctrlWrapper(boardsController.getAllBoards));
boardsRouter.post('/', ctrlWrapper(boardsController.createBoard));
boardsRouter.get(
  '/:boardId',
  isValidIds('boardId'),
  ctrlWrapper(boardsController.getByIdBoard),
);
boardsRouter.patch(
  '/:boardId',
  isValidIds('boardId'),
  ctrlWrapper(boardsController.updateBoard),
);
boardsRouter.delete(
  '/:boardId',
  isValidIds('boardId'),
  ctrlWrapper(boardsController.deleteBoard),
);

// Routes для Columns
boardsRouter.get(
  '/:boardId/columns',
  isValidIds('boardId'),
  ctrlWrapper(columnsController.getAllColumns),
);
boardsRouter.post(
  '/:boardId/columns',
  isValidIds('boardId'),
  ctrlWrapper(columnsController.createColumn),
);
boardsRouter.get(
  '/:boardId/columns/:columnId',
  isValidIds('boardId', 'columnId'),
  ctrlWrapper(columnsController.getByIdColumn),
);
boardsRouter.patch(
  '/:boardId/columns/:columnId',
  isValidIds('boardId', 'columnId'),
  ctrlWrapper(columnsController.updateColumn),
);
boardsRouter.delete(
  '/:boardId/columns/:columnId',
  isValidIds('boardId', 'columnId'),
  ctrlWrapper(columnsController.deleteColumn),
);

// Routes для Cards
boardsRouter.get(
  '/:boardId/columns/:columnId/cards',
  isValidIds('boardId', 'columnId'),
  ctrlWrapper(cardsController.getAllCards),
);
boardsRouter.post(
  '/:boardId/columns/:columnId/cards',
  isValidIds('boardId', 'columnId'),
  ctrlWrapper(cardsController.createCard),
);
boardsRouter.get(
  '/:boardId/columns/:columnId/cards/:cardId',
  isValidIds('boardId', 'columnId', 'cardId'),
  ctrlWrapper(cardsController.getByIdCard),
);
//повертає card!!!
boardsRouter.patch(
  '/:boardId/columns/:columnId/cards/:cardId',
  isValidIds('boardId', 'columnId', 'cardId'),
  ctrlWrapper(cardsController.updateCard),
);
boardsRouter.delete(
  '/:boardId/columns/:columnId/cards/:cardId',
  isValidIds('boardId', 'columnId', 'cardId'),
  ctrlWrapper(cardsController.deleteCard),
);

export default boardsRouter;
