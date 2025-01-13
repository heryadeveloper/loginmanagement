const Joi = require("@hapi/joi");

const createSignupguru = {
    body: Joi.object().keys({
        nama: Joi.string().required(),
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role_name: Joi.string().required(),
        id_role: Joi.number().required(),
        kode_guru: Joi.string().required(),
        tugas: Joi.string(),
    }),
};

const registrationGuru = {
    body: Joi.object().keys({
        nama: Joi.string().required(),
        alamat: Joi.string().required(),
        sex: Joi.number().required(),
        tahun_masuk: Joi.string().required(),
        email: Joi.string().required(),
        no_hp: Joi.string().required(),
        id_role: Joi.number().required(),
        file_name: Joi.string().allow('', null),
        file_path: Joi.string().allow('', null),
        kode_guru: Joi.string(),
    }),
};

const createSignUpSiswa = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        nama: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.number().required(),
        role_name: Joi.string().required(),
        nisn: Joi.string().required(),
        kelas_saat_ini: Joi.string().required(),
        tahun_masuk: Joi.string().required()
    })
}

const deleteDataGuru = {
    body: Joi.object().keys({
        nama: Joi.string().required(),
        kode_guru: Joi.string().required()
    })
}

const updateDataGuru = {
    body: Joi.object().keys({
        id: Joi.number(),
        nama: Joi.string(),
        alamat: Joi.string(),
        email: Joi.string(),
        no_hp: Joi.string(),
        nama_role: Joi.string(),
        id_role: Joi.number(),
        kode_guru: Joi.string(),
    }),
}

module.exports = {
    createSignupguru,
    registrationGuru,
    createSignUpSiswa,
    deleteDataGuru,
    updateDataGuru
}