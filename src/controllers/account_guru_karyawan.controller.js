const { accountGuruKaryawanService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const errorNotFound = require('../utils/errorNotFound');
const responseInfo = require('../utils/responseInfo');
const createError = require('http-errors');
const redisClient = require('../config/init_redis');
const JWT = require('jsonwebtoken');
const config = require("../config/config");
const { use } = require("../route/authRoutes");



class AuthController {
    static async login(req, res, next) {
        console.info("---> step in controller login --->")
        try {
            const { username, email, password, deviceID} = req.body;
            if (!deviceID) {
                // Jika deviceID tidak ada, kirimkan error
                return res.status(400).json({
                    message: 'Device ID is required for login.',
                });
            }


            const { user, accessToken, refreshToken } = await accountGuruKaryawanService.login(username, email, password);

            // store refresh token in redis
            const redisKey = `refreshToken:${user.id}:${deviceID}`;

            
            // Check if the user is already logged in by checking the existence of the refresh token in Redis
            console.log('redis key:', redisKey);


            let existingToken = await redisClient.get(redisKey);
            console.log('redis token: ', existingToken);

            if (existingToken) {
                return res.status(400).json({
                    message: 'User is already logged in',
                });
            }
            
            await redisClient.set(redisKey, refreshToken, {
                EX: 15 * 60,
            });

            const responseData = {
                accessToken,
                refreshToken,
                user
            }
            res.send(responseInfo('Login SuccessFully', responseData));
            
        } catch (error) {
            console.error('Error in login: ', error);
            next(createError(401, error.message));
        }
    }

    static async logout(req, res, next){
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader){
                return res.status(400).json({
                    message: 'Authorization header not provided'
                });
            }

            const token = authHeader.split(' ')[1];
            const payload = JWT.verify(token, config.refreshToken);

            const redisKey = `refreshToken:${payload.userId}`;
            await redisClient.del(redisKey);

            res.status(200).json({ message: 'Logout successful'});
        } catch (error) {
            console.error('Error in logout: ', error);
            next(createError(500, error.message));
        }
    }

    static async loginSiswa (req, res, next){
        try {
            const { username, email, password } = req.body;
            const { userSiswa, accessToken, refreshToken } = await accountGuruKaryawanService.loginSiswa(username, email, password);
            console.log('user', userSiswa);
            // store refresh token in redis
            const redisKey = `refreshToken:${userSiswa.id}`;

            
            // Check if the user is already logged in by checking the existence of the refresh token in Redis
            console.log('redis key:', redisKey);


            let existingToken = await redisClient.get(redisKey);
            console.log('redis token: ', existingToken);

            if (existingToken) {
                return res.status(400).json({
                    message: 'User is already logged in',
                });
            }
            
            await redisClient.set(redisKey, refreshToken, {
                EX: 60 * 60,
            });

            const responseData = {
                accessToken,
                refreshToken,
                userSiswa
            }
            res.send(responseInfo('Login SuccessFully', responseData));
        } catch (error) {
            console.error('Error in login: ', error);
            next(createError(401, error.message));
        }


    }
}

module.exports = AuthController;