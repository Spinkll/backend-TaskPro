import createHttpError from 'http-errors';

import { serializeCard } from '../utils/serializeCard.js';
import { serializeColumn } from '../utils/serializeColumn.js';

import {
  createColumnService,
  deleteColumnService,
  getColumnByIdService,
  getColumnsService,
  updateColumnService,
} from '../services/columns.js';
import {
  addColumnInBoardService,
  deleteColumnInBoardService,
  getBoardByIdService,
  updateColumnInBoardService,
} from '../services/boards.js';

const getAllColumns = async (req, res) => {
  const { boardId } = req.params;

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const columns = await getColumnsService({
    boardId: boardId,
    userId: req.user.id,
  });
  if (!columns) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  let data = columns;
  if (columns?.length > 1) {
    data = columns.map((column) => {
      if (column.cards?.length >= 1) {
        column.cards = column.cards.map((card) => serializeCard(card));
      }
      return serializeColumn(column);
    });
  }
  res.status(200).json({
    status: 200,
    message: 'Columns retrieved successfully',
    data: data,
  });
};

const createColumn = async (req, res) => {
  const { boardId } = req.params;
  const { title } = req.body;

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const newColumn = await createColumnService({
    title: title,
    boardId: boardId,
    userId: req.user.id,
  });
  if (!newColumn) {
    next(createHttpError(404, 'Error create Column'));
    return;
  }

  const newBoard = await addColumnInBoardService({ _id: boardId }, newColumn);
  res.status(201).json({
    status: 201,
    message: 'Column created successfully',
    data: serializeColumn(newColumn),
  });
};

const getByIdColumn = async (req, res) => {
  const { columnId, boardId } = req.params;

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

  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: serializeColumn(column),
  });
};

const updateColumn = async (req, res) => {
  const { columnId, boardId } = req.params;
  const { title } = req.body;
  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const updatedColumn = await updateColumnService(
    { _id: columnId, boardId, userId: req.user.id },
    { title: title },
  );
  if (!updatedColumn) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  const updateBoard = await updateColumnInBoardService(
    { _id: boardId },
    updatedColumn,
  );
  if (!updateBoard) {
    next(createHttpError(404, 'Error to update Column in Board'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: serializeColumn(updatedColumn),
  });
};

const deleteColumn = async (req, res) => {
  const { boardId, columnId } = req.params;

  const board = await getBoardByIdService({
    _id: boardId,
    userId: req.user.id,
  });
  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  const deletedColumn = await deleteColumnService({ _id: columnId });
  if (!deletedColumn) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  const updateBoard = deleteColumnInBoardService(
    { _id: boardId },
    deletedColumn,
  );

  res.status(204).send();
};

const columnsController = {
  getAllColumns,
  createColumn,
  getByIdColumn,
  updateColumn,
  deleteColumn,
};

export default columnsController;
