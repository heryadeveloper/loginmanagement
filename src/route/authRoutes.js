const express = require('express');
const AuthController = require('../controllers/account_guru_karyawan.controller');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;