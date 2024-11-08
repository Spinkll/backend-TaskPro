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
    console.log('Mail send!');
  } catch (error) {
    console.error('Failed to send the email:', error);
  }
};
