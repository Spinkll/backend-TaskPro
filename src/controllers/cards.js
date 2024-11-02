import { CardsCollection } from '../db/cards.js';
import { ColumnsCollection } from '../db/columns.js';
import {
  getBoardByIdService,
  updateCardInBoardService,
} from '../services/boards.js';
import {
  deleteCardInColumnsService,
  getColumnByIdService,
  updateCardInColumnsService as updateCardInColumnsService,
} from '../services/columns.js';
import {
  createCardService,
  deleteCardService,
  getCardByIdService,
  getCardsService,
} from '../services/cards.js';

const cardsController = {
  async getAllCards(req, res) {
    const { boardId, columnId } = req.params;

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const column = getCardsService({ _id: columnId, boardId });
    if (!column) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Column not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Cards retrieved successfully',
      data: column.cards,
    });
  },

  async createCard(req, res) {
    const { boardId, columnId } = req.params;
    const { title, description, priority, date } = req.body;
    const body = { title, description, priority, date, boardId, columnId };
    const id = { userId: req.user.id, boardId, columnId };

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const column = await getColumnByIdService({
      _id: columnId,
      boardId,
      userId: req.user.id,
    });
    if (!column) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Column not found.' });
    }

    const newCard = await createCardService(body);
    if (!newCard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error create card' });
    }

    const updateColumn = await updateCardInColumnsService(
      {
        userId: req.user.id,
        boardId,
        _id: columnId,
      },
      newCard,
    );
    if (!updateColumn) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error update column' });
    }

    const updateBoard = await updateCardInBoardService(id, body);
    if (!updateBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error update card in Board' });
    }

    res.status(201).json({
      status: 'success',
      message: 'Card created successfully',
      data: newCard,
    });
  },

  async getByIdCard(req, res) {
    const { columnId, boardId, cardId } = req.params;
    const id = { cardId, columnId, boardId, userId: req.user.id };

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const column = await getColumnByIdService({
      _id: columnId,
      boardId,
      userId: req.user.id,
    });
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const card = await getCardByIdService(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Card updated successfully',
      data: card,
    });
  },

  async updateCard(req, res) {
    const { boardId, columnId, cardId } = req.params;
    const updateData = req.body;
    const id = { cardId, columnId, boardId, userId: req.user.id };

    const currentCard = await getCardByIdService(id);
    if (!card) {
      return res.status(404).json({ message: 'card not found' });
    }

    const updateColumn = await updateCardInColumnsService(
      {
        userId: req.user.id,
        boardId,
        _id: columnId,
      },
      newCard,
    );
    if (!updateColumn) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error update column' });
    }

    const updateBoard = await updateCardInBoardService(id, updateData);
    if (!updateBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error update card in Board' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Card updated successfully',
      data: updateData,
    });
  },

  async deleteCard(req, res) {
    const { boardId, columnId, idCard } = req.params;
    const id = { cardId, columnId, boardId, userId: req.user.id };
    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const column = await getColumnByIdService({
      _id: columnId,
      boardId,
      userId: req.user.id,
    });
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const currentCard = await deleteCardService(id);
    if (!currentCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const updateBoard = deleteCardInBoardService(id, currentCard);
    if (!updateBoard) {
      return res.status(404).json({ message: 'error update card in board' });
    }

    const updateColumn = deleteCardInColumnsService(id, currentCard);
    if (!updateColumn) {
      return res.status(404).json({ message: 'error update card in column' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Card deleted successfully',
    });
  },
};

export default cardsController;
