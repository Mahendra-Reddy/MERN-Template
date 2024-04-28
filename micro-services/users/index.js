const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const userRouter = require('./routers/userRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const dbURI = 'mongodb://127.0.0.1/micro-services';

mongoose.connect(dbURI).then(res => {
    app.listen(3335, () => {
        console.log('user server is running in port 3335')
    })
}).catch(() => {
    console.log('some thing went down')
})

app.use('/', userRouter)
