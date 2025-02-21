const { QueryTypes } = require('sequelize');
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

// async function insertBulkAccountSiswa(data) {
//     const values = data.map(({ username, email, nama, password, role, role_name, flag_active, nisn, kelas_saat_ini, tahun_masuk }) => 
//         [username, email, nama, password, role, role_name, flag_active, nisn, kelas_saat_ini, tahun_masuk]
//     );

//     const query = `INSERT INTO account (username, email, nama, password, role, role_name, flag_active, nisn, kelas_saat_ini, tahun_masuk) VALUES ?`;

//     return await db.query(query, { replacements: [values], type: db.QueryTypes.INSERT });
// }

async function insertBulkAccountSiswa(data){
    const placeholders = data.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');

    const query = `INSERT INTO account (username, email, nama, password, role, role_name, flag_active, nisn, kelas_saat_ini, tahun_masuk)
    VALUES ${placeholders}
    ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        email = VALUES(email),
        nisn = VALUES(nisn)`;

    const values =data.flatMap(item => [
        item.username,
        item.email,
        item.nama,
        item.password,
        item.role,
        item.role_name,
        item.flag_active,
        item.nisn,
        item.kelas_saat_ini,
        item.tahun_masuk
    ]);

    await db.query(query, {replacements: values, type: QueryTypes.INSERT});

    console.log('Data berhasil di insert atau di update');
}

module.exports = {
    insertAccountSiswa,
    getAccountByEmailSiswa,
    insertBulkAccountSiswa
}