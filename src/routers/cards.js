import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import cardsController from '../controllers/cards.js';
import { createCardSchema, updateCardSchema } from '../validation/cards.js';
import { isValidId } from '../middlewares/isValidId.js';

const cardsRouter = Router();
cardsRouter.use(authenticate);

// Routes для Cards
cardsRouter.get(
  '/:columnId',
  isValidId('columnId'),
  ctrlWrapper(cardsController.getAllCards),
);
cardsRouter.post(
  '/:columnId',
  isValidId('columnId'),
  validateBody(createCardSchema),
  ctrlWrapper(cardsController.createCard),
);
cardsRouter.get(
  '/:cardId',
  isValidId('columnId'),
  ctrlWrapper(cardsController.getByIdCard),
);

cardsRouter.patch(
  '/:cardId',
  isValidId('cardId'),
  validateBody(updateCardSchema),
  ctrlWrapper(cardsController.updateCard),
);
cardsRouter.delete(
  '/:cardId',
  isValidId('cardId'),
  ctrlWrapper(cardsController.deleteCard),
);

export default cardsRouter;
