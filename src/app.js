const express = require('express');
const redisClient = require('./config/init_redis');
const postgres = require('./config/postgres');
const config = require('./config/config');
const authRoutes = require('./route/authRoutes');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

// connect to redis config
app.use((req, res, next) => {
    console.log('init redis');
    req.redisClient = redisClient;
    next();
})

// connect to postgress database
app.use((req, _, next) => {
    req.postgres = postgres;
    next();
})


//enable cors
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// mount routes
app.use('/v1/auth', authRoutes);

module.exports = app;