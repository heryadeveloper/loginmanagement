const crypto = require('crypto')

const key_session = crypto.randomBytes(32).toString('hex');
const acces_token = crypto.randomBytes(32).toString('hex');
const refresh_token = crypto.randomBytes(32).toString('hex');
console.table({key_session, acces_token, refresh_token});