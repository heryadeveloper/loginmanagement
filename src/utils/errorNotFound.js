const httpStatus = require("http-status")

const errorNotFound = (message, data) => {
    return {
        status: 'Not Found',
        code: httpStatus.NOT_FOUND,
        message,
        data,
    };
};

module.exports = errorNotFound