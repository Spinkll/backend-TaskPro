import { SENDGRID_API_KEY } from '../constans/sendMail.js';
import { env } from '../utils/env.js';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(env(SENDGRID_API_KEY));

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to: to,
    from: 'omnifast7@gmail.com',
    subject: subject,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log('Лист відправлено!');
  } catch (error) {
    console.error('Помилка при відправленні листа:', error);
  }
};
