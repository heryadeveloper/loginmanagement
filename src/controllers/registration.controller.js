const { registrationService, accountGuruKaryawanService } = require("../services");
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
});

const deleteGuru = catchAsync(async(req, res) => {
    const deletedGuru = await accountGuruKaryawanService.deleteDataGuru(req);
    if (deletedGuru.data != null) {
        res.send(responseInfo('Success get data guru', deletedGuru));
    } else if (deletedGuru.data == null) {
        res.send(responseInfo('Data tujuan tidak ada', deletedGuru));
    }else {
        res.send(expectationFailed('Cannot Deleted Data', null));
    }
});

const updateGuru = catchAsync(async(req, res) => {
    const updateDataGuru = await accountGuruKaryawanService.updateDataGuru(req);
    if (updateDataGuru) {
        res.send(responseInfo('Success update data guru', updateDataGuru));
    } else if(updateDataGuru.data === null){
        res.send(responseInfo('Data Guru not found', updateDataGuru));
    }else{
        res.send(expectationFailed('Cannot Update Data', null));
    }
});

module.exports = {
    registrationGuru,
    dataGuru,
    deleteGuru,
    updateGuru
}