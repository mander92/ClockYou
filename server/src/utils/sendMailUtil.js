import nodemailer from 'nodemailer';

import {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_EMAIL,
} from '../../env.js';
import generateErrorUtil from './generateErrorUtil.js';

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendMailUtils = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: SMTP_EMAIL,
            to: email,
            subject,
            text: body,
        };

        await transport.sendMail(mailOptions);
    } catch (err) {
        generateErrorUtil('Error al intentar enviar email', 500);
    }
};

export default sendMailUtils;
