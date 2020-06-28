'use strict'

function pruebas(req, res) {
    res.status(200).send({
        message: "Probando el controlador de usuarios y la acción pruebas"
    })
}

module.exports = {
    pruebas
}