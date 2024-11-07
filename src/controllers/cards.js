import createHttpError from 'http-errors';
import { serializeCard } from '../utils/serializeCard.js';
import { getColumnByIdService } from '../services/columns.js';
import {
  createCardService,
  deleteCardService,
  getCardByIdService,
  getCardsService,
  updateCardService,
} from '../services/cards.js';

const getAllCards = async (req, res, next) => {
  const { columnId } = req.params;

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

  const cards = await getCardsService({
    columnId: columnId,
  });
  if (!cards) {
    next(createHttpError(404, 'Cards not found.'));
    return;
  }

  let data = cards;
  if (cards?.length >= 1) {
    data = cards.map((card) => serializeCard(card));
  }

  res.status(200).json({
    status: 200,
    message: 'Cards retrieved successfully.',
    data: data,
  });
};

const createCard = async (req, res, next) => {
  const { columnId } = req.params;
  const reqBody = req.body;

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

  const newCard = await createCardService({
    ...reqBody,
    columnId: column._id,
    boardId: column.boardId,
  });
  if (!newCard) {
    next(createHttpError(404, 'Error to create Card.'));
    return;
  }

  res.status(201).json({
    status: 201,
    message: 'Card created successfully.',
    data: serializeCard(newCard),
  });
};

const getByIdCard = async (req, res, next) => {
  const { cardId } = req.params;

  const card = await getCardByIdService({
    _id: cardId,
  });
  if (!card) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Card updated successfully',
    data: serializeCard(card),
  });
};

const updateCard = async (req, res, next) => {
  const { cardId } = req.params;
  const reqBody = req.body;

  const updateCard = await updateCardService({ _id: cardId }, reqBody);
  if (!updateCard) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Card updated successfully.',
    data: serializeCard(updateCard),
  });
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  const card = await getCardByIdService({
    _id: cardId,
  });
  if (!card) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

  await deleteCardService({
    _id: cardId,
  });

  res.status(204).send();
};

const cardsController = {
  getAllCards,
  createCard,
  getByIdCard,
  updateCard,
  deleteCard,
};

export default cardsController;
