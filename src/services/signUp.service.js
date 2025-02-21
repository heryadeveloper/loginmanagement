const httpStatus = require('http-status');
const db = require('../db/models');
const { getValidasiEmail } = require('../repository/account_guru_karyawan.repository');
const ApiError = require('../utils/ApiError');
const { encryptData, checkPasswordMatch } = require('../utils/auth');
const { accountDataGuruKaryawanRepository, accountDataSiswaRepository, dataGuruKaryawanRepository, dataIndukRepository } = require('../repository');

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const bcrypt = require("bcrypt");

async function signUpAccountGuru(req, res){
    const {nama, email, username, password, role_name, id_role, kode_guru} = req.body;
    try {
        console.log("proccesing service sign up");
        const hashedPassword = await encryptData(password);
        const account = await getValidasiEmail(email);
        // const dataEmail = await dataGuruKaryawanRepository.getValidationEmail(email);
        if (account) {
            throw new ApiError(httpStatus.CONFLICT, 'Email sudah terdaftar');
        }

        const insertAccount = await accountDataGuruKaryawanRepository.insertAccount(nama, email, username, hashedPassword, role_name, id_role, kode_guru);
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

async function getListGuru (){
    try {
        const listGuru = await accountDataGuruKaryawanRepository.getListGuru();
        return listGuru;
    } catch (error) {
        console.error('Error in service sign up siswa', error);
        throw error;
    }
}

async function generateAkunSiswa(req) {
    const { kelas, tahun_ajaran } = req.body;
    try {
        // Ambil data siswa berdasarkan kelas dan tahun ajaran
        const listKelasDetail = await dataIndukRepository.dataIndukRombel(kelas, tahun_ajaran);

        if (!listKelasDetail || listKelasDetail.length === 0) {
            throw new Error("Data siswa tidak ditemukan untuk kelas dan tahun ajaran tersebut.");
        }

        // Password default yang dienkripsi
        const defaultPassword = "user1";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        // Mapping data siswa menjadi array untuk bulk insert
        const insertData = listKelasDetail.map((datas) => ({
            username: datas.nama, // Gunakan NISN sebagai username
            email: `${datas.nama.toLowerCase().replace(/\s+/g, '')}@smknutulis.sch.id`, // Format email
            nama: datas.nama,
            password: hashedPassword, // Password default
            role: 1, // Sesuaikan role
            role_name: "Siswa",
            flag_active: "ACTIVE",
            nisn: datas.nisn,
            kelas_saat_ini: kelas,
            tahun_masuk: tahun_ajaran
        }));

        // Insert bulk ke database (sesuai dengan repository yang digunakan)
        await accountDataSiswaRepository.insertBulkAccountSiswa(insertData);

        console.log("Akun siswa berhasil dibuat dalam bulk.");

         // **Langkah 3: Generate file Excel**
         const filePath = await generateExcel(insertData);

         // **Langkah 4: Kirim response dengan data + link download**
         return ({
             message: "Akun siswa berhasil dibuat!",
             data: insertData,
             downloadLink: `/download/${path.basename(filePath)}`,
         });
 


    } catch (error) {
        console.error("Error in generateAkunSiswa:", error);
        throw error;
    }
}

async function generateExcel(data) {
    const filePath = path.join(__dirname, "generated", `akun_siswa_${Date.now()}.xlsx`);

    // Pastikan folder "generated" ada
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Buat worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(data.map(({ username, email, nama, nisn, kelas_saat_ini, tahun_masuk }) => ({
        Username: username,
        Email: email,
        Nama: nama,
        NISN: nisn,
        Kelas: kelas_saat_ini,
        Tahun_Masuk: tahun_masuk,
    })));

    // Buat workbook dan tambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AkunSiswa");

    // Simpan file Excel
    XLSX.writeFile(workbook, filePath);

    return filePath;
}



module.exports = {
    signUpAccountGuru,
    signUpAccountSiswa,
    getListGuru,
    generateAkunSiswa,
    generateExcel
}
