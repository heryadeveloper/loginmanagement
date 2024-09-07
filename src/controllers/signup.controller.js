const { signUpService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const errorExpectationFailed = require('../utils/errorExpectationFailed');
const responseInfo = require("../utils/responseInfo");

const signup = catchAsync(async(req, res) => {
    const signupdata = await signUpService.signUpAccountGuru(req);
    if (signupdata) {
        res.send(responseInfo('Success Created Data Guru', signupdata));
    } else {
        res.send(errorExpectationFailed('Cannot created data guru', null));
    }
});

module.exports = {
    signup
}