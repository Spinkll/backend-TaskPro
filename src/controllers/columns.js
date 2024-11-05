import createHttpError from 'http-errors';

import { serializeColumn } from '../utils/serializeColumn.js';

import {
  createColumnService,
  deleteColumnService,
  getColumnByIdService,
  getColumnsService,
  updateColumnService,
} from '../services/columns.js';

const getAllColumns = async (req, res, next) => {
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
  if (columns?.length >= 1) {
    data = columns.map((column) => serializeColumn(column));
  }
  res.status(200).json({
    status: 200,
    message: 'Columns retrieved successfully',
    data: data,
  });
};

const createColumn = async (req, res, next) => {
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

  res.status(201).json({
    status: 201,
    message: 'Column created successfully',
    data: serializeColumn(newColumn),
  });
};

const getByIdColumn = async (req, res, next) => {
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

const updateColumn = async (req, res, next) => {
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

  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: serializeColumn(updatedColumn),
  });
};

const deleteColumn = async (req, res, next) => {
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
