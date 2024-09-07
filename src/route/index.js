const express = require('express');
const signupguru = require('./signup.route');
const router = express.Router();

router.use('/guru', signupguru);

module.exports = router;