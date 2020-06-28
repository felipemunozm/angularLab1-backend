'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
let secret = "clave_secreta"

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "FORBBIDEN, no JWT AUTH HEADER" })
    }
    let token = req.headers.authorization.replace(/['"]+/g, '')
    let payload
    try {
        payload = jwt.decode(token, secret)
        if (payload.ext <= moment().unix()) {
            return res.status(401).send({ message: "El JWT token ha expirado" })
        }
    } catch (error) {
        return res.status(404).send({ message: "El JWT token ya no es valido" })
    }
    req.user = payload
    next()
}