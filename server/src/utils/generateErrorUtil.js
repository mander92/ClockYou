const generateErrorUtil = (msg, code) => {
    const err = new Error(msg);
    error.httpStatus = code;
    throw err;
};

export default generateErrorUtil;
