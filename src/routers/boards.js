import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createBoardSchema } from '../validation/boardsValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardController, createCardController, createColumnController, deleteBoardController, deleteCardController, deleteColumnController, getBoardsController, getCardsController, getColunsController, updateBoardController, updateCardController, updateColumnController} from '../controllers/boards.js';
import { createColumnsSchema } from '../validation/columnValidation.js';
import { createCardSchema } from '../validation/cardValidation.js';

const boardsRouter = Router();

boardsRouter.get('/', ctrlWrapper(getBoardsController));
boardsRouter.post('/',validateBody(createBoardSchema), ctrlWrapper(createBoardController));
boardsRouter.patch('/',validateBody(createBoardSchema), ctrlWrapper(updateBoardController));
boardsRouter.delete('/', ctrlWrapper(deleteBoardController));

boardsRouter.get('/column', ctrlWrapper(getColunsController));
boardsRouter.post('/column',validateBody(createColumnsSchema), ctrlWrapper(createColumnController));
boardsRouter.patch('/column',validateBody(createColumnsSchema), ctrlWrapper(updateColumnController));
boardsRouter.delete('/column', ctrlWrapper(deleteColumnController));

boardsRouter.get('/card', ctrlWrapper(getCardsController));
boardsRouter.post('/card',validateBody(createCardSchema), ctrlWrapper(createCardController));
boardsRouter.patch('/card',validateBody(createCardSchema), ctrlWrapper(updateCardController));
boardsRouter.delete('/card', ctrlWrapper(deleteCardController));

export default boardsRouter;
