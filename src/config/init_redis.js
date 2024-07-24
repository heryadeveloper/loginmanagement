const { createClient } = require("redis");

const client = createClient({
    socket: {
        port: 6379,
        host: '127.0.0.1',
    },
});

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