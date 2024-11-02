import { ColumnsCollection } from '../db/columns.js';
import { BoardsCollection } from '../db/boards.js';
import { serializeColumn } from '../utils/serializeColumn.js';
import {
  createColumnService,
  deleteColumnService,
  getColumnByIdService,
  getColumnsService,
  updateColumnService,
} from '../services/columns.js';
import {
  deleteColumnInBoardService,
  updateColumnInBoardService,
} from '../services/boards.js';

const columnsController = {
  // Отримати всі колонки для дошки
  async getAllColumns(req, res) {
    const { boardId } = req.params;

    const board = await getColumnsService({
      _id: boardId,
      userId: req.user.id,
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found!' });
    }

    if (!board.columns) {
      return res.status(404).json({ message: 'Column not found!' });
    }

    let data = board.columns;
    if (board?.columns.length > 1) {
      data = board.columns.map((item) => serializeColumn(item));
    }
    res.status(200).json({
      status: 'success',
      message: 'Columns retrieved successfully',
      data: data,
    });
  },

  // Створити нову колонку в дошці
  async createColumn(req, res) {
    const { boardId } = req.params;
    const { title } = req.body;

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const newColumn = await createColumnService({
      title: title,
      boardId: boardId,
      userId: req.user.id,
    });

    if (!newColumn) {
      return res.status(404).json({ message: 'Error crete column' });
    }

    const newBoard = await updateColumnInBoardService(
      { _id: boardId },
      newColumn,
    );

    res.status(201).json({
      status: 'success',
      message: 'Column created successfully',
      data: newColumn,
    });
  },
  async getByIdColumn(req, res) {
    const { columnId, boardId } = req.params;

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

    res.status(200).json({
      status: 'success',
      message: 'Column updated successfully',
      data: column,
    });
  },

  // Оновити колонку в дошці
  async updateColumn(req, res) {
    const { columnId, boardId } = req.params;
    const { title } = req.body;

    const board = await getBoardByIdService({
      _id: boardId,
      userId: req.user.id,
    });
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found.' });
    }

    const updatedColumn = await updateColumnService(
      { _id: columnId, boardId, userId: req.user.id },
      title,
    );
    if (!updatedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const updateBoard = await updateColumnInBoardService(
      { _id: boardId },
      updatedColumn,
    );

    res.status(200).json({
      status: 'success',
      message: 'Column updated successfully',
      data: updatedColumn,
    });
  },

  // Видалити колонку з дошки
  async deleteColumn(req, res) {
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

    const deletedColumn = await deleteColumnService({ _id: columnId });
    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const updateBoard = deleteColumnInBoardService(
      { _id: boardId },
      deletedColumn,
    );

    res.status(200).json({
      status: 'success',
      message: 'Column deleted successfully',
      data: updateBoard,
    });
  },
};

export default columnsController;
