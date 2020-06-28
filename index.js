'use strict'

let mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:mongo@localhost:27017/angularLab1?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado al a BD")
}).catch((err) => console.log("Error: " + err))

