const httpStatus = require('http-status');
const db = require('../db/models');
const { getValidasiEmail } = require('../repository/account_guru_karyawan.repository');
const ApiError = require('../utils/ApiError');
const { encryptData, checkPasswordMatch } = require('../utils/auth');
const { accountDataGuruKaryawanRepository, accountDataSiswaRepository } = require('../repository');

async function signUpAccountGuru(req, res){
    const {nama, email, username, password, role_name, id_role} = req.body;
    try {
        console.log("proccesing service sign up");
        const hashedPassword = await encryptData(password);
        const account = await getValidasiEmail(email);
        console.log('account : ', account);
        if (account) {
            throw new ApiError(httpStatus.CONFLICT, 'Email sudah terdaftar');
        }

        const insertAccount = await accountDataGuruKaryawanRepository.insertAccount(nama, email, username, hashedPassword, role_name, id_role);
        return insertAccount;
    } catch (error) {
        console.error('Error in service signup', error);
        throw error;
    }
}

async function signUpAccountSiswa(req, res) {
    const {username, email, nama, password, role, role_name, nisn, kelas_saat_ini, tahun_masuk} = req.body;
    try {
        const hashedPassword = await encryptData(password);
        const accountSiswa = await getValidasiEmail(email);
        if (accountSiswa) {
            throw new ApiError(httpStatus.CONFLICT, 'Email has been used before');
        }

        const insertAccSiswa = await accountDataSiswaRepository.insertAccountSiswa(username, email, nama, hashedPassword, role, role_name, nisn, kelas_saat_ini, tahun_masuk);
        return insertAccSiswa;
    } catch (error) {
        console.error('Error in service sign up siswa', error);
        throw error;
    }
}

module.exports = {
    signUpAccountGuru,
    signUpAccountSiswa
}
