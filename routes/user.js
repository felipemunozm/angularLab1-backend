'use strict'

const express = require('express')
const UserController = require('../controllers/user')

const router = express.Router();
const md_auth = require('../middleware/authenticated')


router.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas)
router.post('/register', md_auth.ensureAuth, UserController.saveUser)
router.post('/login', UserController.login)
router.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser)
router.post('/upload-image-user/:id', [md_auth.ensureAuth], UserController.uploadImage)
router.get('/get-image-file/:imageFile', UserController.getImageFile)

module.exports = router