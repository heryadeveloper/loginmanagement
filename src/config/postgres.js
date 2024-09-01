const mysql = require('mysql2/promise');
const { Client } = require('ssh2');
const logger = require('./logger');

const sshConfig = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT ? parseInt(process.env.SSH_PORT) : 22,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
}

const dbServer = {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT ? parseInt(process.env.SQL_PORT) : 3306,
};

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
};

const dbConfig = {
    host: forwardConfig.srcHost,
    port: forwardConfig.srcPort,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE_NAME,
};

function connectSSH() {
    return new Promise((resolve, reject) => {
    const sshClient = new Client();
    sshClient
        .on('ready', () => {
            sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
            if (err) {
                sshClient.end();
                return reject(err);
            }
                    resolve({ sshClient, stream });
                }
            );
        })
        .on('error', (err) => {
            reject(err);
        })
        .connect(sshConfig);
    });
}
  
  async function connectToDatabase() {
    try {
      const { sshClient, stream } = await connectSSH();
      logger.info('SSH connection established');
  
      const connection = await mysql.createConnection({
        ...dbConfig,
        stream,
      });
      logger.info('Connected to MySQL database');
  
      // Test query
      const [rows] = await connection.execute('SELECT NOW() AS currentTime');
      logger.info('Database current time:', rows[0].currentTime);
  
      // Handle connection close
      connection.on('end', () => {
        sshClient.end();
        logger.info('Database and SSH connections closed');
      });
  
      return connection;
    } catch (error) {
      logger.error('Connection error:', error);
      process.exit(1);
    }
  }
  
  module.exports = connectToDatabase();

// const { Client } = require("pg");
// const config = require('../config/config');
// const logger = require("./logger");
// let client;

// (async function name(){
//     client = new Client(config.sqlDB);
//     try {
//         await client.connect();
//         logger.info('Connect to postgress successfully');
//         return client;
//     } catch (error) {
//         logger.error('connect to postgress Error');
//         process.exit(1);
//     }
// })();

// module.exports = {
//     postgres: client,
// }

