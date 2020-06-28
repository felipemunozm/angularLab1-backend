'use strict'

const express = require('express')
const AnimalController = require('../controllers/animal')
const md_auth = require('../middleware/authenticated')
const md_admin = require('../middleware/admin')
const router = express.Router();

router.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas)
router.post('/animal', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.saveAnimal)
router.get('/animal/:id', AnimalController.getAnimal)
router.get('/animals', AnimalController.getAnimals)
router.put('/animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.updateAnimal)
router.post('/upload-image-animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.uploadImage)
router.get('/get-image-animal/:imageFile', AnimalController.getImageFile)
router.delete('/animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.deleteAnimal)

module.exports = router