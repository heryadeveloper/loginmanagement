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

async function insertBulkAccountSiswa(data) {
    const values = data.map(({ username, email, nama, password, role, role_name, flag_active, nisn, kelas_saat_ini, tahun_masuk }) => 
        `('${username}', '${email}', '${nama}', '${password}', '${role}', '${role_name}','${flag_active}', '${nisn}', '${kelas_saat_ini}', '${tahun_masuk}')`
    ).join(", ");

    const query = `INSERT INTO account (username, email, nama, password, role, role_name,flag_active, nisn, kelas_saat_ini, tahun_masuk) VALUES ${values}`;
    
    return await db.query(query);
}

module.exports = {
    insertAccountSiswa,
    getAccountByEmailSiswa,
    insertBulkAccountSiswa
}