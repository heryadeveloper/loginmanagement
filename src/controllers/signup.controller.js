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

const signupSiswa = catchAsync(async(req, res) => {
    const signUpDataSiswa = await signUpService.signUpAccountSiswa(req);
    if (signUpDataSiswa) {
        res.send(responseInfo('Success Created Account Siswa', signUpDataSiswa));
    } else {
        res.send(errorExpectationFailed('Cannot created Account Siswa', null));
    }
})

module.exports = {
    signup,
    signupSiswa
}