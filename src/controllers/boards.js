import createHttpError from 'http-errors';
import { serializeBoard } from '../utils/serializeBoard.js';
import {
  createBoardService,
  deleteBoardService,
  getBoardByIdService,
  getBoardsService,
  updateBoardService,
} from '../services/boards.js';

const getAllBoards = async (req, res, next) => {
  const id = { userId: req.user.id };
  const boards = await getBoardsService(id);
  if (!boards) {
    next(createHttpError(404, 'Boards not found'));
    return;
  }

  let data = boards;
  if (boards?.length >= 1) {
    data = boards.map((board) => serializeBoard(board));
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

  const board = await getBoardByIdService({ _id: boardId });
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

  const updatedBoard = await updateBoardService({ _id: boardId }, updateData);
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
  const board = await getBoardByIdService({ _id: boardId });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  await deleteBoardService({ _id: board._id });

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
