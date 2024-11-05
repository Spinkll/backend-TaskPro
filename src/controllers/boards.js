import createHttpError from 'http-errors';
import { serializeBoard } from '../utils/serializeBoard.js';
import { serializeColumn } from '../utils/serializeColumn.js';
import { serializeCard } from '../utils/serializeCard.js';

import {
  createBoardService,
  deleteBoardService,
  getBoardByIdService,
  getBoardsService as getBoardService,
  updateBoardService,
} from '../services/boards.js';

const getAllBoards = async (req, res, next) => {
  const id = { userId: req.user.id };
  const boards = await getBoardService(id);
  if (!boards) {
    next(createHttpError(404, 'Boards not found'));
    return;
  }

  let data = boards;
  if (boards?.length >= 1) {
    data = boards.map((board) => {
      if (board.columns?.length >= 1) {
        board.columns = board.columns.map((column) => {
          if (column.cards?.length >= 1) {
            column.cards = column.cards.map((card) => serializeCard(card));
          }
          return serializeColumn(column);
        });
      }
      return serializeBoard(board);
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Boards retrieved successfully',
    data: data,
  });
};

const createBoard = async (req, res, next) => {
  const { title, background, icon } = req.body;
  const body = { title, background, icon, userId: req.user.id };

  const newBoard = await createBoardService(body);
  if (!newBoard) {
    next(createHttpError(404, 'Error Board create'));
    return;
  }

  res.status(201).json({
    status: 'success',
    message: 'Board created successfully',
    data: serializeBoard(newBoard),
  });
};

const getByIdBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const id = { _id: boardId, userId: req.user.id };

  const board = await getBoardByIdService(id);
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }
  res.status(200).json({
    status: 'success',
    message: 'Successfully found board!',
    data: serializeBoard(board),
  });
};

const updateBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const updateData = req.body;
  const id = { _id: boardId, userId: req.user.id };

  const updatedBoard = await updateBoardService(id, updateData);

  if (!updatedBoard) {
    next(createHttpError(404, 'Board not found'));
    return;
  }
  res.status(200).json({
    status: 'success',
    message: 'Board updated successfully',
    data: serializeBoard(updatedBoard),
  });
};

const deleteBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const id = { _id: boardId, userId: req.user.id };
  const deletedBoard = await deleteBoardService(id);
  if (!deletedBoard) {
    next(createHttpError(404, 'Board not found'));
    return;
  }
  res.status(204).send();
};

const boardsController = {
  getAllBoards,
  createBoard,
  getByIdBoard,
  updateBoard,
  deleteBoard,
};
export default boardsController;
