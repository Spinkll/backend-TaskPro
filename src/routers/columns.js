import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import columnsController from '../controllers/columns.js';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validation/columns.js';
import { isValidId } from '../middlewares/isValidId.js';

const columnsRouter = Router();

columnsRouter.use(authenticate);

// Routes для Columns
columnsRouter.get('/:boardId', ctrlWrapper(columnsController.getAllColumns));
columnsRouter.post(
  '/:boardId',
  validateBody(createColumnSchema),
  ctrlWrapper(columnsController.createColumn),
);
columnsRouter.get(
  '/v1/:columnId',
  ctrlWrapper(columnsController.getByIdColumn),
);
columnsRouter.patch(
  '/v1/:columnId',
  validateBody(updateColumnSchema),
  ctrlWrapper(columnsController.updateColumn),
);
columnsRouter.delete(
  '/v1/:columnId',
  ctrlWrapper(columnsController.deleteColumn),
);

export default columnsRouter;
