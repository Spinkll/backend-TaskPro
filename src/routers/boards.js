import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentificate } from '../middlewares/authentificate.js';
import boardsController from '../controllers/boards.js';
import columnsController from '../controllers/columns.js';

const curRouter = Router();

curRouter.use(authentificate);

curRouter.get('/', ctrlWrapper(boardsController.getAllBoards));
curRouter.post('/', ctrlWrapper(boardsController.createBoard));
curRouter.patch('/:boardId', ctrlWrapper(boardsController.updateBoard));
curRouter.delete('/:boardId', ctrlWrapper(boardsController.deleteBoard));

// Routes для Columns
curRouter.get('/:boardId/columns', columnsController.getAllColumns);
curRouter.post('/:boardId/columns', columnsController.createColumn);
curRouter.patch('/:boardId/columns/:columnId', columnsController.updateColumn);
curRouter.delete('/:boardId/columns/:columnId', columnsController.deleteColumn);

// // Routes для Cards
// curRouter.get('/:boardId/columns/:columnId/cards', cardsController.getAllCards);
// curRouter.post('/:boardId/columns/:columnId/cards', cardsController.createCard);
// curRouter.patch(
//   '/:boardId/columns/:columnId/cards/:idCard',
//   cardsController.updateCard,
// );
// curRouter.delete(
//   '/:boardId/columns/:columnId/cards/:idCard',
//   cardsController.deleteCard,
// );

export default curRouter;
