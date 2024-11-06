import { getUser } from '../services/auth.js';
import { createBoard, createCard, createColumn, deleteBoard, deletecard, deleteColumn, getBoards, getCards, getColumns, parhBoard, pathCard, pathColumn } from '../services/boards.js';

export const getBoardsController = async (req, res) => {
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);
  const boards = await getBoards(getingUser.id);
  
  res.status(201).send({
    status: 201,
    message: `Successfully find a boards!`,
    data: boards,
  });
};

export const createBoardController = async (req, res) => {
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newBoard = await createBoard({...body, userId: getingUser.id});

  res.status(201).send({
    status: 201,
    message: `Successfully created a board!`,
    data: newBoard,
  });
};

export const updateBoardController = async (req, res) => {
  const boardId = req.query.boardId;
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newBoard = await parhBoard(boardId, body);

  res.status(200).send({
    status: 200,
    message: `Successfully patched a board!`,
    data: newBoard,
  });
};

export const deleteBoardController = async (req, res, next) => {
  const boardId = req.query.boardId;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  await deleteBoard(boardId);

  res.status(204).send();
};


export const createColumnController = async (req, res) => {
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newColumn = await createColumn(body);

  res.status(201).send({
    status: 201,
    message: `Successfully created a column!`,
    data: newColumn,
  });
};

export const getColunsController = async (req, res) => {
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);
  const boardId = req.query.boardId;
  const columns = await getColumns(boardId);
  
  res.status(201).send({
    status: 201,
    message: `Successfully find a columns!`,
    data: columns,
  });
};

export const updateColumnController = async (req, res) => {
  const columnId = req.query.columnId;
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newColumn = await pathColumn(columnId, body);

  res.status(200).send({
    status: 200,
    message: `Successfully patched a board!`,
    data: newColumn,
  });
};


export const deleteColumnController = async (req, res) => {
  const columnId = req.query.columnId;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  await deleteColumn(columnId);

  res.status(204).send();
};

export const createCardController = async (req, res) => {
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newColumn = await createCard(body);

  res.status(201).send({
    status: 201,
    message: `Successfully created a card!`,
    data: newColumn,
  });
};

export const getCardsController = async (req, res) => {
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);
  const columnId = req.query.columnId;
  const columns = await getCards(columnId);
  
  res.status(201).send({
    status: 201,
    message: `Successfully find a cards!`,
    data: columns,
  });
};

export const updateCardController = async (req, res) => {
  const cardId = req.query.cardId;
  const { body } = req;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  const newCard = await pathCard(cardId, body);

  res.status(200).send({
    status: 200,
    message: `Successfully patched a card!`,
    data: newCard,
  });
};

export const deleteCardController = async (req, res) => {
  const cardId = req.query.cardId;
  const getingUser = await getUser(req.cookies.sessionId, req.cookies.sessionToken);

  await deletecard(cardId);

  res.status(204).send();
};