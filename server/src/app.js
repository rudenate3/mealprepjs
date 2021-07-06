const express = require('express')

const app = express()

app.use('/', (req, res) => res.send({success:true}))

module.exports = { app }