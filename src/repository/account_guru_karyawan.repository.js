const db = require('../db/models');

async function getDataAccountGuru(username, email, password){
    try {
        const dataAccountGuru = await db.account_guru_karyawan.findOne({
            where:{
                username: username,
                email: email,
                password: password,
            },
            attributes: ['nama', 'role_name', 'flag_active', 'username', 'id_role', 'email'],
            raw: true,
        });
        return dataAccountGuru;
    } catch (error) {
        console.error('Error when get data account guru', error);
        throw error;
    }
}

async function getAccountByEmailGuru(username, email){
    console.info("---> step in repository login--->")
    const accountGuru = await db.account_guru_karyawan.findOne({
        where: {
            username: username,
            email: email,
        },
        attributes:['id','username','email','password', 'role_name'],
        raw: true,
    });
    return accountGuru;
}

async function getValidasiEmail(email){
    const validasiEmail = await db.account_guru_karyawan.findOne({
        where: {email},
        attributes:['email','password','flag_active'],
        raw:true,
    });
    return validasiEmail;
}

async function insertAccount(nama, email, username, password, role_name, id_role){
    try {
        const insertData = await db.account_guru_karyawan.create({
            nama, email, username, password, role_name, flag_active:"ACTIVE", created_at: new Date(), id_role,
        });
        return insertData.get({ plain:true });
    } catch (error) {
        console.error('Error when insert table account_guru_karyawan', error);
        throw error;
    }
}


module.exports = {
    getDataAccountGuru,
    getAccountByEmailGuru,
    getValidasiEmail,
    insertAccount
}
