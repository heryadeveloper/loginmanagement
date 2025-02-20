const path = require("path");
const { signUpService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const errorExpectationFailed = require('../utils/errorExpectationFailed');
const responseInfo = require("../utils/responseInfo");
const fs = require("fs");

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
});

const listGuru = catchAsync(async(req, res) => {
    const dataListGuru = await signUpService.getListGuru();
    if (dataListGuru) {
        res.send(responseInfo('Success Get List Data Guru', dataListGuru));
    } else {
        res.send(errorExpectationFailed('Cannot Get Data', null));
    }
})

const generateAkunSiswa = catchAsync(async(req, res) => {
    const data = await signUpService.generateAkunSiswa(req);
    if (data) {
        res.send(responseInfo('success generate akun siswa', data))
    } else {
        res.send(errorExpectationFailed('Cannot generate akun siswa', null));
    }
})

const downloadHasilGenerate = catchAsync(async(req, res) => {
    const { fileName } = req.query;
    const filePath = path.join(__dirname, "../services/generated", fileName);
    console.log('path: ', filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File tidak ditemukan" });
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error("Gagal mengunduh file:", err);
            res.status(500).json({ message: "Gagal mengunduh file" });
        }
    });
})

module.exports = {
    signup,
    signupSiswa,
    listGuru,
    generateAkunSiswa,
    downloadHasilGenerate
}