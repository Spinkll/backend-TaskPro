import {
  addsCardInBoardService,
  deleteCardInBoardService,
  getBoardByIdService,
  updateCardInBoardService,
} from '../services/boards.js';
import {
  getColumnByIdService,
  updateCardInColumnsService,
} from '../services/columns.js';
import {
  createCardService,
  deleteCardService,
  getCardByIdService,
  getCardsService,
} from '../services/cards.js';
import { serializeCard } from '../utils/serializeCard.js';

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

    const cards = await getCardsService({
      columnId,
      boardId,
      userId: req.user.id,
    });
    if (!cards) {
      return res
        .status(404)
        .json({ status: 'error', message: 'cards not found.' });
    }

    let data = cards;
    if (cards?.length >= 1) {
      data = cards.map((card) => serializeCard(card));
    }

    res.status(200).json({
      status: 'success',
      message: 'Cards retrieved successfully',
      data: data,
    });
  },

  async createCard(req, res) {
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
    // const id = { userId: req.user.id, boardId, _id: columnId };

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const newCard = await createCardService(body);
    if (!newCard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error create card' });
    }

    const updateBoard = addsCardInBoardService(boardId, newCard);
    if (!updateBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error add card to board' });
    }

    res.status(201).json({
      status: 'success',
      message: 'Card created successfully',
      data: serializeCard(newCard),
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
      data: serializeCard(card),
    });
  },

  async updateCard(req, res) {
    const { boardId, columnId, cardId } = req.params;
    const updateData = req.body;
    const id = { _id: cardId, columnId, boardId, userId: req.user.id };
    const currentCard = await getCardByIdService(id);
    if (!currentCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const updateColumn = await updateCardInColumnsService(
      {
        userId: req.user.id,
        boardId,
        _id: columnId,
      },
      currentCard,
    );
    if (!updateColumn) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Error update column' });
    }

    const updateBoard = await updateCardInBoardService(id, updateData);
    if (!updateBoard) {
      return res.status(404).json({
        status: 'error',
        message: `Error update card in Board ${updateBoard}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Card updated successfully',
      data: serializeCard(updateData),
    });
  },

  async deleteCard(req, res) {
    const { boardId, columnId, cardId } = req.params;
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

    const currentCard = await deleteCardService({
      _id: cardId,
      columnId,
      boardId,
      userId: req.user.id,
    });
    if (!currentCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const updateBoard = await deleteCardInBoardService(
      { _id: cardId, columnId, boardId, userId: req.user.id },
      currentCard,
    );
    if (!updateBoard) {
      return res
        .status(404)
        .json({ message: `error update card in board ${updateBoard}` });
    }

    // const updateColumn = await deleteCardInColumnsService(
    //   {
    //     _id: columnId,
    //     boardId,
    //     userId: req.user.id,
    //   },
    //   currentCard,
    // );
    // if (!updateColumn) {
    //   return res.status(404).json({ message: 'error update card in column' });
    // }

    res.status(204).json({
      status: 'success',
      message: 'Card deleted successfully',
      data: serializeCard(currentCard),
    });
  },
};

export default cardsController;
