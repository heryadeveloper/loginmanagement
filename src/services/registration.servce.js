const e = require("cors");
const { dataGuruKaryawanRepository } = require("../repository");

async function registrationGuru(req, res){
    const {nama, alamat, tahun_masuk, email, no_hp, nama_role, id_role, file_name, file_path, jabatan, mata_pelajaran} = req.body;
    try {
        console.log('Proccesing service registration guru');
        // first get nama role from id role
        const dataRole = await dataGuruKaryawanRepository.getRole(id_role);
        console.log('data role : ', dataRole);
        const insertNewDataGuru = await dataGuruKaryawanRepository.registrationGuru(nama, alamat, tahun_masuk, email, no_hp, dataRole.nama_role, id_role, file_name, file_path, dataRole.nama_role, mata_pelajaran);
        return insertNewDataGuru;
    } catch (error) {
        console.error('Error in service registration', error);
        throw error;
    }
}

async function dataGuru(req, res) {
    try{
        const dataguru = await dataGuruKaryawanRepository.getDataGuru();
        return dataguru;
    }catch (error){
        console.error('Error in service get data guru', error);
        throw error;
    }
}

module.exports = {
    registrationGuru,
    dataGuru,
}