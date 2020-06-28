'use strict'

const express = require('express')
const bodyParser = require('body-parser')


const app = express();

//cargar rutas
const userRoutes = require('./routes/user')
//middleware bodyparser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configurar cabecera y cors

//ruta base

app.use('/api', userRoutes)


module.exports = app;