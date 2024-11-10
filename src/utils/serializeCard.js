export const serializeCard = (card) => {
  return {
    _id: card._id,
    title: card.title,
    description: card.description,
    priority: card.priority,
    dateDeadline: card.dateDeadline,
    columnId: card.columnId,
    boardId: card.boardId,
  };
};
