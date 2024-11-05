import createHttpError from 'http-errors';

import { serializeCard } from '../utils/serializeCard.js';
import {
  addsCardInBoardService,
  deleteCardInBoardService,
  getBoardByIdService,
  updateCardInBoardService,
} from '../services/boards.js';

import {
  addsCardInColumnService,
  deleteCardInColumnService,
  getColumnByIdService,
  updateCardInColumnService,
} from '../services/columns.js';

import {
  createCardService,
  deleteCardService,
  getCardByIdService,
  getCardsService,
  updateCardService,
} from '../services/cards.js';

const getAllCardsByColumn = async (req, res, next) => {
  const { boardId, columnId } = req.params;

  const board = await getBoardByIdService({
    _id: boardId,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  const cards = await getCardsService({
    columnId,
  });
  if (!cards) {
    next(createHttpError(404, 'Cards not found'));
    return;
  }

  let data = cards;
  if (cards?.length >= 1) {
    data = cards.map((card) => serializeCard(card));
  }

  res.status(200).json({
    status: 200,
    message: 'Cards retrieved successfully',
    data: data,
  });
};

const createCard = async (req, res, next) => {
  const { columnId } = req.params;
  const { title, description, priority, date } = req.body;
  const body = {
    title,
    description,
    priority,
    date,
    columnId,
  };

  const newCard = await createCardService(body);
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
  const { columnId, boardId, cardId } = req.params;

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

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
  const { boardId, columnId, cardId } = req.params;
  const updateData = req.body;

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

  const currentCard = await getCardByIdService(id);
  if (!currentCard) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

  const updateCard = await updateCardService(id, updateData);
  if (!updateCard) {
    next(createHttpError(404, 'Error update Card in Card'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Card updated successfully',
    data: serializeCard(updateData),
  });
};

const deleteCard = async (req, res, next) => {
  const { boardId, columnId, cardId } = req.params;

  const column = await getColumnByIdService({
    _id: columnId,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

  const currentCard = await deleteCardService({
    _id: cardId,
    columnId,
    boardId,
    userId: req.user.id,
  });
  if (!currentCard) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

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
