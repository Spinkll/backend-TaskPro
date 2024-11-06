import { createBoard } from '../services/boards.js';

export const getBoardsController = async (req, res) => {};

export const createBoardController = async (req, res) => {
  const { title, background, icon } = req.body;

  const newData = {
    title,
    background,
    icon,
  };

  const newBoard = await createBoard(newData);

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: newBoard,
  });
};
