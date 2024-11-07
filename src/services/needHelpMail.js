import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { sendEmail } from '../utils/sendMail.js';
import { TEMPLATES_DIR } from '../constans/saveFiles.js';
import createHttpError from 'http-errors';

export const needHelpMail = async (req, res) => {
  console.log(req.body);

  const { email, comment } = req.body;
  const sendMailTemplatePath = path.join(TEMPLATES_DIR, 'need-help-email.html');

  const templateSource = (await fs.readFile(sendMailTemplatePath)).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    email,
    comment,
  });

  if (!email || !comment) {
    return res.status(400).send('Email is required!');
  }

  try {
    await sendEmail(
      'taskpro.project@gmail.com', // Почта получателя (изменить для теста). Почта для сдачи taskpro.project@gmail.com
      'Project Team 6 Send Feedback',
      html,
    );
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
