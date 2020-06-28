'use strict'

const express = require('express')
const UserController = require('../controllers/user')

const router = express.Router();

router.get('/pruebas-del-controlador', UserController.pruebas)
router.post('/register', UserController.saveUser)
router.post('/login', UserController.login)

module.exports = router