const db = require('../db/models');


async function dataIndukRombel(kelas, tahun_ajaran) {
    try {
        const listDataKelas = await db.data_induk.findAll({
            where: {
                rombel_saat_ini: kelas,
                tahun_ajaran
            },
            order: [['nama', 'asc']],
            raw: true
        });
        return listDataKelas;
    } catch (error) {
        console.error('Error when get data induk');
        throw error;
    }
}

module.exports = {
    dataIndukRombel
}