const db = require('../db/models');

async function insertAccountSiswa(username, email, nama, password, role, role_name, nisn, kelas_saat_ini, tahun_masuk) {
    try {
        const insertAccSiswa = await db.account.create({
            username, email, nama, password, role, role_name, nisn, kelas_saat_ini, tahun_masuk, flag_active:"ACTIVE"
        });
        return insertAccSiswa.get({ plain:true });
    } catch (error) {
        console.error('Error when inserting account siswa repository');
        throw error;
    }
}

async function getAccountByEmailSiswa(username, email) {
    try {
        const accountSiswa = await db.account.findOne({
            where: {
                username,
                email,
            },
            raw: true,
        });
        return accountSiswa;
    } catch (error) {
        console.error('Error in get data in repository');
        throw error;
    }
}

module.exports = {
    insertAccountSiswa,
    getAccountByEmailSiswa
}