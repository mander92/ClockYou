const generateErrorUtil = (msg, code) => {
    const error = new Error(msg);
    error.httpStatus = code;
    throw error;
};

export default generateErrorUtil;
