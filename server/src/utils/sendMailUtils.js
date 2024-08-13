import nodemailer from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env.js';
import generateErrorUtil from './generateErrorUtil.js';

// el transporte es un objeto del nodemailer que hace uso de mi server SMTP (brevo)
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendMailUtils = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    generateErrorUtil('Error al intentar enviar email', 500);
  }
};

export default sendMailUtils;
