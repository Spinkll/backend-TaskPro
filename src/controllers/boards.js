import { BoardsCollection } from '../db/boards.js';
import { serializeBoard } from '../utils/serializeBoard.js';
import { serializeColumn } from '../utils/serializeColumn.js';

const boardsController = {
  async getAllBoards(req, res) {
    const boards = await BoardsCollection.find({
      userId: req.user.id,
    });

    res.status(200).json({
      status: 'success',
      message: 'Boards retrieved successfully',
      boards: boards,
    });
  },

  async createBoard(req, res) {
    const { title, background, icon } = req.body;
    const newBoard = new BoardsCollection({
      title,
      background,
      icon,
      userId: req.user.id,
    });
    const savedBoard = await newBoard.save();
    res.status(201).json({
      status: 'success',
      message: 'Board created successfully',
      data: savedBoard,
    });
  },

  async updateBoard(req, res) {
    const { boardId } = req.params;
    const updateData = req.body;

    const updatedBoard = await BoardsCollection.findOneAndUpdate(
      { _id: boardId, userId: req.user.id },
      updateData,
      { new: true },
    );
    if (!updatedBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Board updated successfully',
      data: updatedBoard,
    });
  },

  async deleteBoard(req, res) {
    const { boardId } = req.params;

    const deletedBoard = await BoardsCollection.findOneAndDelete({
      _id: boardId,
      userId: req.user.id,
    });
    if (!deletedBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Board deleted successfully',
      data: deletedBoard,
    });
  },
};

export default boardsController;
