'use strict'

const express = require('express')
const UserController = require('../controllers/user')

const router = express.Router();

router.get('/pruebas-del-controlador', UserController.pruebas)

module.exports = router