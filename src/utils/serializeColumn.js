export const serializeColumn = (column) => {
  return {
    _id: column._id,
    title: column.title,
    cards: column.cards,
  };
};
