import { ColumnsCollection } from '../db/columns.js';
import { BoardsCollection } from '../db/boards.js';
import { serializeColumn } from '../utils/serializeColumn.js';
import { createColumnService, getColumnsService } from '../services/columns.js';

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
    // if (board?.columns.length > 1) {
    //   data = board.columns.map((item) => serializeColumn(item));
    // }
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
    // const newColumn = await createColumnService(body);

    const newColumn = new ColumnsCollection({
      title: title,
      boardId: boardId,
      userId: req.user.id,
    });
    const savedColumn = await newColumn.save();
    const id = { _id: boardId };
    await BoardsCollection.findByIdAndUpdate(id, {
      $push: { columns: savedColumn },
    });

    res.status(201).json({
      status: 'success',
      message: 'Column created successfully',
      data: savedColumn,
    });
  },

  // Оновити колонку в дошці
  async updateColumn(req, res) {
    const { columnId } = req.params;
    const { title } = req.body;
    const id = { _id: columnId };
    const updatedColumn = await ColumnsCollection.findByIdAndUpdate(
      id,
      { title },
      { new: true },
    );
    if (!updatedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Column updated successfully',
      data: updatedColumn,
    });
  },

  // Видалити колонку з дошки
  async deleteColumn(req, res) {
    const { boardId, columnId } = req.params;
    const deletedColumn = await ColumnsCollection.findByIdAndDelete(columnId);
    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    await BoardsCollection.findByIdAndUpdate(boardId, {
      $pull: { columns: deletedColumn._id },
    });

    res.status(200).json({
      status: 'success',
      message: 'Column deleted successfully',
      data: deletedColumn,
    });
  },
};

export default columnsController;
