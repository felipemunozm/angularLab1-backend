'use strict'

'use strict'
const fs = require('fs')
const path = require('path')

const UserModel = require('../models/user')
const AnimalModel = require('../models/animal')

function pruebas(req, res) {
    res.status(200).send({
        message: "Probando el controlador de animales y la acción pruebas",
        user: req.user
    })
}

function saveAnimal(req, res) {
    let animal = new AnimalModel()
    let params = req.body

    if (params.name) {
        animal.name = params.name
        animal.description = params.description
        animal.year = params.year
        animal.image = null
        animal.user = req.user.sub
        animal.save((err, animalStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error al guardar animal en el servidor"
                })
            } else {
                if (!animalStored) {
                    res.status(404).send({
                        message: "Error al guardar animal"
                    })
                } else {
                    res.status(200).send({ animal: animalStored })
                }
            }
        })
    } else {
        res.status(403).send({ message: "Nombre es obligatorio" })
    }
}

function getAnimals(req, res) {
    AnimalModel.find({}).populate({ path: 'user' }).exec((err, dbAnimals) => {
        if (err)
            res.status(500).send({
                message: "Error en la petición"
            })
        else {
            if (!dbAnimals) {
                res.status(404).send({
                    message: "Animales no encontrados"
                })
            } else {
                res.status(200).send({ animals: dbAnimals })
            }
        }
    })
}

function getAnimal(req, res) {
    let animalId = req.params.id
    AnimalModel.findById(animalId).populate('user').exec((err, dbAnimal) => {
        if (err)
            res.status(500).send({
                message: "Error en la petición"
            })
        else {
            if (!dbAnimal) {
                res.status(404).send({
                    message: "Animal no encontrado"
                })
            } else {
                res.status(200).send({ animal: dbAnimal })
            }
        }
    })
}

function updateAnimal(req, res) {
    let animalId = req.params.id
    let newAnimal = req.body
    AnimalModel.findByIdAndUpdate(animalId, newAnimal, { new: true }, (err, dbAnimal) => {
        if (err)
            res.status(500).send({
                message: "Error en la petición"
            })
        else {
            if (!dbAnimal) {
                res.status(404).send({
                    message: "Animal no encontrado"
                })
            } else {
                res.status(200).send({ animal: dbAnimal })
            }
        }
    })
}

function uploadImage(req, res) {
    let animalId = req.params.id
    let filename = "No Subido..."

    if (req.files && Object.keys(req.files).length != 0 && req.files.image) {
        let image = req.files.image
        let uploadDir = 'upload/animals/'
        filename = uploadDir + image.name
        image.mv(filename, (err) => {
            if (err)
                return res.status(500).send({ message: "No se han podido subido archivos: " + err })
            AnimalModel.findByIdAndUpdate(animalId, { image: image.name }, { new: true }, (err, dbAnimal) => {
                if (err) {
                    res.status(500).send({ messsage: "Error al actualizar animal" })
                } else {
                    if (!dbAnimal)
                        res.status(404).send({ message: "No se ha podido encontrar el animal" })
                    else
                        res.status(200).send({ animal: dbAnimal })
                }
            })
        })
    } else {
        res.status(404).send({ message: "No se han subido archivos" })
    }
}

function getImageFile(req, res) {
    let imageFile = req.params.imageFile
    let pathFile = './upload/animals/' + imageFile
    fs.exists(pathFile, (exists) => {
        if (exists)
            res.sendFile(path.resolve(pathFile))
        else
            res.status(404).send({ message: "No se ha encontrado " + imageFile })
    })
}

function deleteAnimal(req, res) {
    let animalId = req.params.id
    AnimalModel.findByIdAndRemove(animalId, (err, delAnimal) => {
        if (err)
            res.status(500).send({
                message: "Error en la petición"
            })
        else {
            if (!delAnimal) {
                res.status(404).send({
                    message: "Animal no encontrado"
                })
            } else {
                res.status(200).send({ animal: delAnimal })
            }
        }
    })
}
module.exports = {
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAnimal
}