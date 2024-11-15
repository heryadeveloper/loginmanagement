const { where, QueryTypes } = require('sequelize');
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

async function registrationGuru(nama, alamat, sex, tahun_masuk, email, no_hp, nama_role, id_role, file_name, file_path, jabatan, kode_guru){
    try {
        console.log('insert data guru');
        const indonesiaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'); // Use 'Asia/Makassar' for WITA or 'Asia/Jayapura' for WIT
        const registration = await db.data_guru_karyawan.create({
            nama,
            alamat,
            sex,
            tahun_masuk,
            email,
            no_hp,
            nama_role,
            id_role,
            file_name,
            file_path,
            jabatan,
            created_at: indonesiaTime,
            kode_guru: kode_guru
        });
        console.log('regist: ', registration);
        return registration.get({ plain:true });
    } catch (error) {
        console.error('Error in insert table data_guru_karyawan', error);
    }
}

async function getDataGuru(){
    try {
        const result = await db.sequelize.query(
            `select a.id,
                a.nama ,
                a.jabatan ,
                a.kode_guru ,
                a.tahun_masuk ,
                b.email from data_guru_karyawan a
                left join account_guru_karyawan b on
                a.nama = b.nama`,{
                    type: QueryTypes.SELECT
                }
        )
        return result;
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

async function getValidationEmail(email){
    try {
        const dataValidasiEmail = await db.data_guru_karyawan.findOne({
            where: {email},
            raw: true,
        })
        return dataValidasiEmail;
    } catch (error) {
        console.error('Error get data role', error);
        throw error;
    }
}

async function deleteDataGuru(nama, kode_guru) {
    try {
        const result = await db.sequelize.query(
            `delete a, b
                from data_guru_karyawan a
                left join account_guru_karyawan b on
                a.nama = b.nama
                and a.kode_guru = b.kode_guru
                where a.nama = :nama
                and a.kode_guru = :kode_guru`,{
                    replacements: {
                        nama: nama,
                        kode_guru: kode_guru
                },
                type: QueryTypes.DELETE
            }
        );
        return result;
    } catch (error) {
        console.error('Error delete data guru');
        throw error;
    }
}
module.exports = {
    signUpGuru,
    registrationGuru,
    getDataGuru,
    getRole,
    getValidationEmail,
    deleteDataGuru
}