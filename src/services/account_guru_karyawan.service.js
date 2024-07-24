const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { accountDataGuruKaryawanRepository } = require("../repository");

async function getAccountGuruLogin(req, res){
    try {
        const {username, email, password} = req.body;
        const user = await accountDataGuruKaryawanRepository.getAccountByEmailGuru(email);
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'Invalid email');
        }
        const loginGuru = await accountDataGuruKaryawanRepository.getDataAccountGuru(username, email, user.password);
        return loginGuru;
    } catch (error) {
        console.error('Error get data account guru: ', error);
        throw error;
    }
}

const generateAccessToken = (user) => {
    return JWT.sign({ userId: user.id, role: user.role }, config.accessToken, {
        expiresIn: '1h',
        issuer: 'login_management',
        audience: String(user.id),
    });
};

const generateRefreshToken = (user) =>{
    return JWT.sign({ userId: user.id, role: user.role }, config.refreshToken, {
        expiresIn: '7d',
        issuer: 'login_management',
        audience: String(user.id),
    });
};

const validatePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};

const login = async(username, email, password) => {
    console.info("---> step in service login --->")
    const user = await accountDataGuruKaryawanRepository.getAccountByEmailGuru(username, email);
    if (!user) throw new Error('Invalid Email');

    const isPasswordMatch = await validatePassword(password, user.password);
    if (!isPasswordMatch) throw new Error('Invalid Password');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
};

module.exports = {
    getAccountGuruLogin,
    login
}