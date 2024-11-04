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
} from '../services/cards.js';

const getAllCards = async (req, res, next) => {
  const { boardId, columnId } = req.params;

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const column = await getColumnByIdService({
    _id: columnId,
    boardId,
    userId: req.user.id,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  const cards = await getCardsService({
    columnId,
    boardId,
    userId: req.user.id,
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
  const { boardId, columnId } = req.params;
  const { title, description, priority, date } = req.body;
  const body = {
    title,
    description,
    priority,
    date,
    boardId,
    columnId,
    userId: req.user.id,
  };

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found.'));
    return;
  }

  const newCard = await createCardService(body);
  if (!newCard) {
    next(createHttpError(404, 'Error to create Card.'));
    return;
  }

  const updateColumn = addsCardInColumnService(columnId, newCard);
  if (!updateColumn) {
    next(createHttpError(404, 'Error add Card to Column.'));
    return;
  }

  const updateBoard = addsCardInBoardService(boardId, newCard);
  if (!updateBoard) {
    next(createHttpError(404, 'Error add Card to Board.'));
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
  const id = { cardId, columnId, boardId, userId: req.user.id };

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found.'));
    return;
  }

  const column = await getColumnByIdService({
    _id: columnId,
    boardId,
    userId: req.user.id,
  });
  if (!column) {
    next(createHttpError(404, 'Column not found.'));
    return;
  }

  const card = await getCardByIdService(id);
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
  const id = { _id: cardId, columnId, boardId, userId: req.user.id };

  const currentCard = await getCardByIdService(id);
  if (!currentCard) {
    next(createHttpError(404, 'Card not found.'));
    return;
  }

  const updateColumn = await updateCardInColumnService(id, updateData);
  if (!updateColumn) {
    next(createHttpError(404, 'Error update Card in Column'));
    return;
  }

  const updateBoard = await updateCardInBoardService(id, updateData);
  if (!updateBoard) {
    next(createHttpError(404, 'Error update card in Board'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Card updated successfully',
    data: serializeCard(updateData),
  });
};

const deleteCard = async (req, res) => {
  const { boardId, columnId, cardId } = req.params;

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found.'));
    return;
  }

  const column = await getColumnByIdService({
    _id: columnId,
    boardId,
    userId: req.user.id,
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

  const updateColumn = await deleteCardInColumnService(
    {
      _id: columnId,
      boardId,
      userId: req.user.id,
    },
    currentCard,
  );
  if (!updateColumn) {
    next(createHttpError(404, 'Error update Card in Column'));
    return;
  }

  const updateBoard = await deleteCardInBoardService(
    { _id: cardId, columnId, boardId, userId: req.user.id },
    currentCard,
  );
  if (!updateBoard) {
    next(createHttpError(404, 'Error update Card in Board'));
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
