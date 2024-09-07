const Joi = require("@hapi/joi");

const createSignupguru = {
    body: Joi.object().keys({
        nama: Joi.string().required(),
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role_name: Joi.string().required(),
        id_role: Joi.string().required(),
    }),
};

const registrationGuru = {
    body: Joi.object().keys({
        nama: Joi.string().required(),
        alamat: Joi.string().required(),
        tahun_masuk: Joi.string().required(),
        email: Joi.string().required(),
        no_hp: Joi.string().required(),
        id_role: Joi.number().required(),
        file_name: Joi.string().allow('', null),
        file_path: Joi.string().allow('', null),
        mata_pelajaran: Joi.string().allow('', null),
    }),
};

module.exports = {
    createSignupguru,
    registrationGuru
}