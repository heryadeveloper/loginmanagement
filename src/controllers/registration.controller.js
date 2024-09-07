const { registrationService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const expectationFailed = require("../utils/errorExpectationFailed");
const responseInfo = require("../utils/responseInfo");

const registrationGuru = catchAsync(async(req, res) => {
    const registration = await registrationService.registrationGuru(req);
    if (registration) {
        res.send(responseInfo('Success registration new guru', registration));
    } else {
        res.send(expectationFailed('Cannot created data guru', null));
    }
});

const dataGuru = catchAsync(async(req, res) => {
    const data = await registrationService.dataGuru();
    if (data) {
        res.send(responseInfo('Success get data guru', data));
    } else {
        res.send(expectationFailed('Cannot get data', null));
    }
})
module.exports = {
    registrationGuru,
    dataGuru
}