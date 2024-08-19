import 'dotenv/config';

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_EMAIL,
    CLIENT_URL,
    UPLOADS_DIR,
} = process.env;

export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_EMAIL,
    CLIENT_URL,
    UPLOADS_DIR,
};
