const path = require('path');
const dotenv = require('dotenv');
const Joi = require('@hapi/joi');


dotenv.config({
    path : path.join(__dirname, '../../.env')
});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV : Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(8080),

        SQL_USERNAME: Joi.string().description('sqldb username'),
        SQL_HOST: Joi.string().description('sqldb host'),
        SQL_DATABASE_NAME: Joi.string().description('sqldb database name'),
        SQL_PASSWORD: Joi.string().description('sql password'),
        SQL_DIALECT: Joi.string()
            .default('mysql')
            .description('type of sqldb'),
        SQL_MAX_POOL: Joi.number()
			.default(10)
			.min(5)
			.description('sqldb max pool connection'),
		SQL_MIN_POOL: Joi.number()
			.default(0)
			.min(0)
			.description('sqldb min pool connection'),
		SQL_IDLE: Joi.number()
			.default(10000)
			.description('sqldb max pool idle time in miliseconds'),
        SESSION_SECRET: Joi.string().required().description('Session Secret'),
        ACCESS_TOKEN: Joi.string().required().description('Access Token'),
        REFRESH_TOKEN: Joi.string().required().description('Refresh Token'),
    })
    .unknown();

const { value : envVars, error} = envVarsSchema
.prefs({ errors: { label:'key'}})
.validate(process.env)

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    sqlDB: {
        user: envVars.SQL_USERNAME,
        host: envVars.SQL_HOST,
        database: envVars.SQL_DATABASE_NAME,
        password: envVars.SQL_PASSWORD,
        dialect: envVars.SQL_DIALECT,
        pool: {
            max: envVars.SQL_MAX_POOL,
            min: envVars.SQL_MIN_POOL,
            idle: envVars.SQL_IDLE
        },
        define: {
			timestamps: false,
			// Table names won't be pluralized.
			freezeTableName: true,
			// Column names will be underscored.
			underscored: true,
		},
    },
    session: envVars.SESSION_SECRET,
    accessToken: envVars.ACCESS_TOKEN,
    refreshToken: envVars.REFRESH_TOKEN
}