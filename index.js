const http = require('http');
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const App = require('./src/app');
const redisClient = require('./src/config/init_redis');


const server = http.Server(App);

const port = config.port || 3002;
server.listen(port, () => {
    logger.info(`App is listening on port ${config.port}`);
})

redisClient.on('connect', () => {
    console.log('Redis client connected successfully');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err.message);
});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});

