const { Client } = require("pg");
const config = require('../config/config');
const logger = require("./logger");
let client;

(async function name(){
    client = new Client(config.sqlDB);
    try {
        await client.connect();
        logger.info('Connect to postgress successfully');
        return client;
    } catch (error) {
        logger.error('connect to postgress Error');
        process.exit(1);
    }
})();

module.exports = {
    postgres: client,
}