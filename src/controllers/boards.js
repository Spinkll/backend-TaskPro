import createHttpError from 'http-errors';
import {
  createBoardService,
  deleteBoardService,
  getBoardByIdService,
  getBoardsService,
  updateBoardService,
} from '../services/boards.js';
import { serializeBoard } from '../utils/serializeBoard.js';
import { serializeColumn } from '../utils/serializeColumn.js';
import { serializeCard } from '../utils/serializeCard.js';

const boardsController = {
  async getAllBoards(req, res) {
    const id = { userId: req.user.id };
    const boards = await getBoardsService(id);
    if (!boards) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Boards not found' });
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
  },

  async createBoard(req, res) {
    const { title, background, icon } = req.body;
    const body = { title, background, icon, userId: req.user.id };

    const newBoard = await createBoardService(body);

    if (!newBoard) {
      return res.status(404).json({ message: 'Error crete board' });
    }

    res.status(201).json({
      status: 'success',
      message: 'Board created successfully',
      data: serializeBoard(newBoard),
    });
  },

  async getByIdBoard(req, res) {
    const { boardId } = req.params;
    const id = { _id: boardId, userId: req.user.id };

    const board = await getBoardByIdService(id);
    if (!board) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully found board!',
      data: serializeBoard(board),
    });
  },

  async updateBoard(req, res) {
    const { boardId } = req.params;
    const updateData = req.body;
    const id = { _id: boardId, userId: req.user.id };

    const updatedBoard = await updateBoardService(id, updateData);
    if (!updatedBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Board updated successfully',
      data: serializeBoard(updatedBoard.board),
    });
  },

  async deleteBoard(req, res) {
    const { boardId } = req.params;
    const id = { _id: boardId, userId: req.user.id };
    const deletedBoard = await deleteBoardService(id);
    if (!deletedBoard) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Board not found' });
    }
    res.status(204).send();
    // res.status(204).json({
    //   status: 'success',
    //   message: 'Board deleted successfully',
    //   data: deletedBoard,
    // });
  },
};

export default boardsController;
