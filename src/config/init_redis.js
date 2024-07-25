const { createClient } = require("redis");

const redisOptions = {
    db: process.env.REDIS_DB || 0,
    ...(process.env.REDIS_CLIENT === 'redis' && {
        socket: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
        },
    }),
    ...(process.env.REDIS_CLIENT === 'predis' && {
        path: process.env.REDIS_PATH || '/tmp/redis.sock',
    }),
};

const client = process.env.REDIS_SCHEME === 'unix'? createClient({
    ...redisOptions,
    socket: {
        path: process.env.REDIS_PATH,
    },
    }) : createClient(redisOptions);

// const client = createClient({
//     socket: {
//         port: 6379,
//         host: '127.0.0.1',
//     },
// });

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.log('Redis client error', err);
});

client.on('ready', () => {
    console.log('Client connected to redis and ready to use.');
});

process.on('SIGINT', async() => {
    await client.disconnect();
    console.log('Redis client disconnected through app termination');
    process.exit(0);
});

(async () => {
    try {
        await client.connect();
        console.log('Redis client connected successfully 2');
    } catch (error) {
        console.error('Redis connection error: ', error);
    }
})();

module.exports = client;