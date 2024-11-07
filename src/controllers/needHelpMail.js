import { needHelpMail } from '../services/needHelpMail.js';

export const needHelpMailController = async (req, res) => {
  await needHelpMail(req);
  res.status(200).json({
    message: 'Email was successfully sent!',
    status: 200,
    data: {},
  });
};
