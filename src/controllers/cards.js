import CardsCollection from '../db/Card.js';
import ColumnsCollection from '../db/Column.js';

const cardsController = {
  async getAllCards(req, res) {
    const { boardId, columnId } = req.params;
    try {
      const column = await ColumnsCollection.findOne({
        _id: columnId,
        boardId,
        userId: req.user.id,
      }).populate('cards');
      if (!column) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Column not found' });
      }
      res.status(200).json({
        status: 'success',
        message: 'Cards retrieved successfully',
        data: column.cards,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async createCard(req, res) {
    const { boardId, columnId } = req.params;
    const { title, description, priority, date } = req.body;
    try {
      const column = await ColumnsCollection.findOne({
        _id: columnId,
        boardId,
        userId: req.user.id,
      });
      if (!column) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Column not found' });
      }
      const newCard = new CardsCollection({
        title,
        description,
        priority,
        date,
      });
      column.cards.push(newCard);
      await column.save();
      res.status(201).json({
        status: 'success',
        message: 'Card created successfully',
        data: newCard,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async updateCard(req, res) {
    const { boardId, columnId, idCard } = req.params;
    const updateData = req.body;
    try {
      const column = await ColumnsCollection.findOne({
        _id: columnId,
        boardId,
        userId: req.user.id,
      });
      if (!column) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Column not found' });
      }
      const card = column.cards.id(idCard);
      if (!card) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Card not found' });
      }
      Object.assign(card, updateData);
      await column.save();
      res.status(200).json({
        status: 'success',
        message: 'Card updated successfully',
        data: card,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async deleteCard(req, res) {
    const { boardId, columnId, idCard } = req.params;
    try {
      const column = await ColumnsCollection.findOne({
        _id: columnId,
        boardId,
        userId: req.user.id,
      });
      if (!column) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Column not found' });
      }
      const card = column.cards.id(idCard);
      if (!card) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Card not found' });
      }
      card.remove();
      await column.save();
      res.status(200).json({
        status: 'success',
        message: 'Card deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};

export default cardsController;
