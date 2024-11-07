export const serializeBoard = (board) => {
  return {
    _id: board._id,
    title: board.title,
    icon: board.icon,
    background: board.background,
  };
};
