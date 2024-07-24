const { accountGuruKaryawanService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const errorNotFound = require('../utils/errorNotFound');
const responseInfo = require('../utils/responseInfo');
const createError = require('http-errors');
const redisClient = require('../config/init_redis');
const JWT = require('jsonwebtoken');
const config = require("../config/config");


// const getUserGuruLogin = catchAsync(async(req, res) => {
//     try {
//         const loginDataGuru = await accountGuruKaryawanService.getAccountGuruLogin(req);
//         if (loginDataGuru.length === 0) {
//             res.status(404).send(errorNotFound('Not Found this Account', loginDataGuru));
//         } else {
//             const accessToken = await signAccessToken(loginDataGuru.nama)
//             console.log('access token', accessToken);
//             const refreshToken = await signRefreshToken(loginDataGuru.nama)
//             console.log('refresh token : ', refreshToken);
//             const responseData = {
//                 ...loginDataGuru,
//                 tokens: {accessToken, refreshToken},
//             };
//             console.log('response data : ', responseData);
//             res.send(responses('Found this account guru', responseData));
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(error.statusCode).send(internalServerError('Service Not Ok', error.statusCode, error.message, null));
//     }
// });

// module.exports = {
//     login,
// };


class AuthController {
    static async login(req, res, next) {
        console.info("---> step in controller login --->")
        try {
            const { username, email, password} = req.body;
            const { user, accessToken, refreshToken } = await accountGuruKaryawanService.login(username, email, password);

            // store refresh token in redis
            const redisKey = `refreshToken:${user.id}`;

            
            // Check if the user is already logged in by checking the existence of the refresh token in Redis
            console.log('redis key:', redisKey);

            // await redisClient.set('testKey', 'testValueTesting', {
            //     EX:60,
            // });
            // const value = await redisClient.get('testKey');
            // console.log('Value from Redis:', value);


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
}

module.exports = AuthController;