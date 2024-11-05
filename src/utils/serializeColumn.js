export const serializeColumn = (column) => {
  return {
    _id: column._id,
    boardId: column.boardId,
    title: column.title,
  };
};
