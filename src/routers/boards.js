import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentificate } from '../middlewares/authentificate.js';
import boardsController from '../controllers/boards.js';
import columnsController from '../controllers/columns.js';
import cardsController from '../controllers/cards.js';

const boardsRouter = Router();

boardsRouter.use(authentificate);

boardsRouter.get('/', ctrlWrapper(boardsController.getAllBoards));
boardsRouter.post('/', ctrlWrapper(boardsController.createBoard));
boardsRouter.get('/:boardId', ctrlWrapper(boardsController.getBoard));
boardsRouter.patch('/:boardId', ctrlWrapper(boardsController.updateBoard));
boardsRouter.delete('/:boardId', ctrlWrapper(boardsController.deleteBoard));

// Routes для Columns
boardsRouter.get(
  '/:boardId/columns',
  ctrlWrapper(columnsController.getAllColumns),
);
boardsRouter.post(
  '/:boardId/columns',
  ctrlWrapper(columnsController.createColumn),
);
boardsRouter.get(
  '/:boardId/columns/:columnId',
  ctrlWrapper(columnsController.getByIdColumn), //повертає column!!!
);
boardsRouter.patch(
  '/:boardId/columns/:columnId',
  ctrlWrapper(columnsController.updateColumn),
);
boardsRouter.delete(
  '/:boardId/columns/:columnId',
  ctrlWrapper(columnsController.deleteColumn),
);

// Routes для Cards
boardsRouter.get(
  '/:boardId/columns/:columnId/cards',
  cardsController.getAllCards,
);
boardsRouter.post(
  '/:boardId/columns/:columnId/cards',
  cardsController.createCard,
);
boardsRouter.patch(
  '/:boardId/columns/:columnId/cards/:idCard',
  cardsController.updateCard,
);
boardsRouter.delete(
  '/:boardId/columns/:columnId/cards/:idCard',
  cardsController.deleteCard,
);

export default boardsRouter;
