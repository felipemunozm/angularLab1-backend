'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const uploadFile = require('express-fileupload')


const app = express();

//cargar rutas
const userRoutes = require('./routes/user')
const animalRoutes = require('./routes/animal')
//middleware bodyparser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(uploadFile())

//configurar cabecera y cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers", 'Authorization, X_API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, DELETE')
    res.header("Allow", 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})
//ruta base

app.use('/api', userRoutes)
app.use('/api', animalRoutes)


module.exports = app;