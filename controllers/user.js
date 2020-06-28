'use strict'
const bcrypt = require('bcrypt-nodejs')

const UserModel = require('../models/user')

const jwtService = require('../services/jwt')

function pruebas(req, res) {
    res.status(200).send({
        message: "Probando el controlador de usuarios y la acción pruebas",
        user: req.user
    })
}

function saveUser(req, res) {
    let user = new UserModel()
    let params = req.body
    console.log(JSON.stringify(params))
    if (params.name && params.password && params.email) {
        user.name = params.name
        user.surname = params.name
        user.email = params.email
        user.role = 'ROLE_USER'
        user.image = null
        UserModel.findOne({ email: user.email.toLowerCase() }, (err, userResponse) => {
            if (err)
                res.status(500).send({ message: "Error al comprobar el usuario" })
            else if (!userResponse) {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash
                    console.log("Usuario a guardar: " + JSON.stringify(user))
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({
                                message: "Error al guardar el usuario en BD"
                            })
                        }
                        else {
                            if (!userStored) {
                                res.status(404).send({ message: "No se ha registrado el usuario" })
                            } else {
                                res.status(200).send({
                                    user: userStored
                                })
                            }
                        }
                    })
                })
            } else {
                res.status(500).send({ message: "El usuario ya existe" })
            }
        })

    } else {
        res.status(200).send({ message: "datos incorrectos para usuario" })
    }
}

function login(req, res) {
    let params = req.body
    let email = params.email
    let password = params.password

    UserModel.findOne({ email: email.toLowerCase() }, (err, userResponse) => {
        if (err)
            res.status(500).send({ message: "Error al comprobar el usuario" })
        else if (userResponse) {
            bcrypt.compare(password, userResponse.password, (err, check) => {
                if (check)
                    if (params.getToken)
                        res.status(200).send({ token: jwtService.createToken(userResponse) })
                    else
                        res.status(200).send({ userResponse })
                else
                    res.status(404).send({ messsage: "El usuario no ha podido validarse" })
            })
        } else {
            res.status(404).send({ messsage: "El usuario no ha podido ingresar" })
        }
    })
}

function updateUser(req, res) {
    let userId = req.params.id
    let newUser = req.body
    let loggedUser = req.user
    if (userId != loggedUser.sub) {
        return res.status(401).send({ message: "FORBBIDEN, usuario diferente al del token" })
    }
    UserModel.findByIdAndUpdate(userId, newUser, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ messsage: "Error al actualizar usuario" })
        } else {
            if (!userUpdated)
                res.status(404).send({ message: "No se ha podido encontrar el usuario" })
            else
                res.status(200).send({ user: userUpdated })
        }
    })
}
module.exports = {
    pruebas,
    saveUser,
    updateUser,
    login
}