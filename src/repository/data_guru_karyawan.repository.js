const { where } = require('sequelize');
const db = require('../db/models');
const moment = require('moment-timezone');
const { raw } = require('body-parser');

async function signUpGuru(nama, email, username, password, role_name, id_role){
    try {
        const signAccountGuru = await db.account_guru_karyawan.create({
            nama, email, username, password, role_name, flag_active:"ACTIVE", created_at: new Date(), id_role,
        });

        return signAccountGuru.get({ plain:true });
    } catch (error) {
        console.error('Error in insert table account_guru_karyawan', error);
        throw error;
    }
}

async function registrationGuru(nama, alamat, tahun_masuk, email, no_hp, nama_role, id_role, file_name, file_path, jabatan, mata_pelajaran){
    try {
        const indonesiaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'); // Use 'Asia/Makassar' for WITA or 'Asia/Jayapura' for WIT
        const registration = await db.data_guru_karyawan.create({
            nama,
            alamat,
            tahun_masuk,
            email,
            no_hp,
            nama_role,
            id_role,
            file_name,
            file_path,
            jabatan,
            mata_pelajaran,
            created_at: indonesiaTime,
        });
        return registration.get({ plain:true });
    } catch (error) {
        console.error('Error in insert table data_guru_karyawan', error);
    }
}

async function getDataGuru(){
    try {
        const data = await db.data_guru_karyawan.findAll({
            attributes:['nama', 'jabatan', 'mata_pelajaran', 'tahun_masuk'],
            order:[['nama','ASC']],
            raw: true,
        })
        return data;
    } catch (error) {
        console.error('Error get data guru', error);
        throw error;
    }
}

async function getRole(id_role){
    try{
        const dataRole = await db.role_management.findOne({
            where: {id_role},
            raw: true,
        })
        return dataRole;
    }catch(error){
        console.error('Error get data role', error);
        throw error;
    }
}
module.exports = {
    signUpGuru,
    registrationGuru,
    getDataGuru,
    getRole
}