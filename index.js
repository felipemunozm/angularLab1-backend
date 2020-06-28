'use strict'

let mongoose = require('mongoose')
let app = require('./app')
const { init } = require('./app')
let port = process.env.PORT || 3000

async function start() {
    let conection = await mongoose.connect('mongodb://mongo:mongo@localhost:27017/angularLab1?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado a la MongoDB")
    })
    if (conection != null)
        console.log("parece que conecto: " + conection)
    app.listen(port, () => {
        console.log("Iniciado express en puerto: " + port)
    })
}

start()
