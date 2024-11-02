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
  deleteBoardByColumnIdService,
  updateBoardByColumnIdService,
} from '../services/boards.js';

const columnsController = {
  // Отримати всі колонки для дошки
  async getAllColumns(req, res) {
    const { boardId } = req.params;
    const id = { _id: boardId };

    const board = await getColumnsService(id);

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
    const body = {
      title: title,
      boardId: boardId,
      userId: req.user.id,
    };

    const newColumn = await createColumnService(body);
    if (!newColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const newBoard = await updateBoardByColumnIdService(
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
    const id = { _id: columnId };
    const column = await getColumnByIdService(id);
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
    const body = {
      title: title,
      boardId: boardId,
      userId: req.user.id,
    };
    const id = { _id: columnId };
    const updatedColumn = await updateColumnService(id, body);
    if (!updatedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }
    const updateBoard = await updateBoardByColumnIdService(
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

    const deletedColumn = await deleteColumnService({ _id: columnId });
    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }
    const updateBoard = deleteBoardByColumnIdService(
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
