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


module.exports = {
    getDataAccountGuru,
    getAccountByEmailGuru
}
