const httpStatus = require("http-status")

const internalServerError = (status, code, message, data) => {
    return{
        status,
        code,
        message,
        data,
    };
};

module.exports = internalServerError